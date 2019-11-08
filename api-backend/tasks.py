from fastai.vision import ImageDataBunch, imagenet_stats, get_transforms, cnn_learner, fit_one_cycle, models, error_rate, load_learner, open_image
import pandas as pd
import numpy as np
import os
import json
import smtplib
import pydicom as dicom
from cv2 import cv2
from database import db


url = "https://www.google.com/"
UPLOAD_FOLDER = './static/images/'


def sendMail(toAddress, data):
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login("dsfh4567@gmail.com", "baseca77@")
    message = "Your model," + \
        data['name']+" has finished training.\n Click to here to deploy.==>"+url
    server.sendmail(
        "dsfh4567@gmail.com",
        toAddress,
        message)
    server.quit()


def train_model(labels, description, model, toEmail):
    dframe = {
        "name": [],
        "label": []
    }
    for label in labels:
        # r=root, d=directories, f = files
        for _, _, f in os.walk(UPLOAD_FOLDER+label):
            for file in f:
                if '.jpg' or '.png' in file:
                    dframe['name'].append(label+'/'+file)
                    dframe['label'].append(labels.index(label))

    df = pd.DataFrame.from_dict(dframe)

    # Train a fastai model
    np.random.seed(42)
    bs = 10
    data = ImageDataBunch.from_df(UPLOAD_FOLDER, df, valid_pct=0.2, ds_tfms=get_transforms(
        flip_vert=True), size=224, num_workers=4, bs=bs).normalize(imagenet_stats)

    learn = cnn_learner(data, models.resnet34, metrics=error_rate)
    learn.fit_one_cycle(1)
    learn.export()
    os.makedirs('./models/'+model)
    os.rename(UPLOAD_FOLDER+'export.pkl',
              './models/'+model+'/export.pkl')

    # Adding model info to the db, helps when deploying
    data_for_models = {
        u'name': model,
        u'labels': labels,
        u'desciption': description
    }
    res = json.dumps(data_for_models)
    response = json.loads(res)
    try:
        db.collection(u'Models').document(model).set(data_for_models)
    except Exception as e:
        print(e)
        print('DB error')
    sendMail(toEmail, data_for_models)

    return response


def convertDicom(path, name):

    PNG = False
    # Specify the .dcm folder path
    folder_path = path
    # Specify the output jpg/png folder path
    jpg_folder_path = path+"_DCM"
    os.makedirs(jpg_folder_path)

    images_path = os.listdir(folder_path)
    for _, image in enumerate(images_path):
        ds = dicom.dcmread(os.path.join(folder_path, image))
        pixel_array_numpy = ds.pixel_array
        if PNG == False:
            image = image.replace('.dcm', '.jpg')
        else:
            image = image.replace('.dcm', '.png')
        cv2.imwrite(os.path.join(jpg_folder_path, image), pixel_array_numpy)

    files_list = []
    for _, _, files in os.walk(jpg_folder_path):
        files_list = files

    image_ref = db.collection(u'Images').document(name+"_DCM")
    data = {
        u'names': files_list,
        u'label': name+"_DCM",
        u'isDicom': True
    }
    # Add a new doc in collection 'cities' with ID 'LA'
    image_ref.set(data)

    return "Success"
