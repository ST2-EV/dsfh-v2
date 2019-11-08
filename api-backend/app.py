import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from firebase_admin import credentials, firestore
from database import db
from fastai.vision import load_learner, open_image
import json
from tasks import train_model, convertDicom
from redis import Redis
from rq import Queue
from flask_cors import CORS
q = Queue(connection=Redis())


UPLOAD_FOLDER = './static/images/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.secret_key = "super secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DEBUG'] = True
CORS(app)

# belper functions


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def messageReceived(methods=['GET', 'POST']):
    print('Training Complete!!')


@app.route("/")
def check():
    return "Backend is working!"

# API that takes a list of labels and trains a resnet 34 model on it and saves the model in the directory  ./models
@app.route("/train/<string:model>", methods=['POST'])
def train(model):
    if request.json:
        labels = request.json["data_for_training"]["labels"]
        description = request.json["data_for_training"]["description"]
        to = request.json["data_for_training"]["toEmail"]
    if(len(labels) < 2):
        err = {
            u'message': "Minimum of 2 labels is required",
        }
        r = json.dumps(err)
        re = json.loads(r)

        return re
    else:
        # Making sure the labels sent exists.
        isuff_labels = []
        for label in labels:
            try:
                doc_ref = db.collection(u'Images').document(label)
                doc = doc_ref.get()
                if (len(doc.to_dict()['names']) < 20):
                    isuff_labels.append(label)
            except:
                return 'No such label exists'

        if(len(isuff_labels) > 0):
            error = {
                "message": "These labels dont have enough images (Minimum 20 required)",
            }
            resp = json.dumps(error)
            ress = json.loads(resp)

            return ress
        else:

            args = (labels, description, model, to)
            result = q.enqueue_call(train_model, args=args, timeout=1000)
            return "Success"


# Gives a link to the deployed model
@app.route("/deploy/<string:model_name>/a/", methods=['POST'])
def deploy(model_name):

    doc_ref = db.collection(u'Models').document(model_name)

    try:
        doc = doc_ref.get()
        labels = doc.to_dict()['labels']
    except:
        print(u'No such model exists!')
        return 'No such model exists!'

    if 'file' not in request.files:
        flash('No file part')
        return 'No File Sent'

    file = request.files['file']
    file.save("./tmp/samp.jpg")
    img = open_image("./tmp/samp.jpg")

    learn = load_learner('./models/'+model_name)
    pred_class, _, _ = learn.predict(img)
    pred = int(pred_class)

    os.remove("./tmp/samp.jpg")
    data_foy = {
        u'prediction': labels[pred],
    }
    resy = json.dumps(data_foy)
    respons = json.loads(resy)
    return respons

# Gets a file and saves it under the folder <name>.
@app.route("/send-file/<string:name>/a/", methods=['POST'])
def sendfile(name):
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return 'No File Sent'

        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'No File Selected'

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            path = os.path.join(app.config['UPLOAD_FOLDER'], name)
            # The folder is created if it does'nt exist.
            if not os.path.exists(path):
                os.makedirs(path)

            # Pushing name of files to firebase db
            image_ref = db.collection(u'Images').document(name)
            if image_ref.get().exists:
                image_ref.update(
                    {u'names': firestore.ArrayUnion([filename])})
            else:
                data = {
                    u'names': [filename],
                    u'label': name,
                }
                # Add a new doc in collection 'cities' with ID 'LA'
                image_ref.set(data)

            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], name, filename))

            return 'File added'

    return 'error'


@app.route("/config", methods=['POST'])
def config():
    folder_name = request.json["data_for_config"]["Folder_Name"]
    fileType = request.json["data_for_config"]["fileType"]
    if folder_name == "" or fileType == "":
        return jsonify(
            message="No data was sent!",
            typ="error"
        )
    path = UPLOAD_FOLDER+folder_name
    if(os.path.isdir(path)):
        if fileType == 'Image':
            files_list = []
            for _, _, files in os.walk(path):
                files_list = files

            image_ref = db.collection(u'Images').document(folder_name)
            data = {
                u'names': files_list,
                u'label': folder_name,
                u'isDicom': False
            }
            # Add a new doc in collection 'cities' with ID 'LA'
            image_ref.set(data)
            return jsonify(
                message="Success! The folder has been updated!",
                typ="success"
            )

        elif fileType == 'Dicom':
            args = (path, folder_name)
            res = q.enqueue_call(convertDicom, args=args, timeout=400)
            return jsonify(
                message="Success! The folder will be updated soon!",
                typ="success"
            )
        else:
            return jsonify(
                message="Something is wrong with file-type!!",
                typ="error"
            )
    else:
        return jsonify(
            message="Folder does not exist. Check Folder name carefully!!",
            typ="error"
        )


if __name__ == "__main__":
    app.run()
