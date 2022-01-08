# DSFH
Data Science For Hospitals.

### Description:
A platform for hospitals where doctors can store and record images of disesases with external symptoms to make predictive models with their mobile phone. These models can be used by other members of the hospital to automate the checkup processess. This can be helpfull to make hospitals more efficient. This can also be helpful in cases of certain epidemics.

### Features:
* It’s a data collection and an autoDL platform that helps doctors and other medical personnel collect, save, mange and process data.
* Doctors can make predictive models with 1 click. And deploy them to a mobile application.They can constantly make new models when they have newer data and deploy them. 
* So there is a continuous development cycle with a human in the loop. This really helps to mature the product fast.
* The models made by doctors can be easily exposed as an public API that can be used by other hospitals and clinics or any industry that requires medical expertise.

### Installation:
##### First, git clone the repo
```$ git clone https://github.com/ST2-EV/dsfh-v2.git```<br />
```$ dsfh-v2```

##### Backend:
Setup a firebase project and download the private key of your project and place the json file in the api-backend folder.<br />
```$ cd api-backend/```

Go to the api-backend/app.py file and path to your private key.<br />
```$ cred = credentials.Certificate("path/to/private/key")```

Install Redis Queue and run ```rq worker```. Use [this](https://python-rq.org/) to install. Run the flask app<br />
```$ flask run```

Your backend is ready!!

##### Mobile applications:
There are two apps, one for taking and uploading images and aanother to run the predictive models.
<br />
send-file-app is to upload images.
Inference-app is to run the predictive models.
Open these folders with andriod studion and build and run the apps.
APKs folder has the apk files for both the apps.<br />
[Google drive link for APKs](https://drive.google.com/open?id=1RybSKRTsmAs1U3F9MrY9AhkwKJ0q-5s5)
<br />

##### Dashboard web application:
Go into the dashboard folder an run,
```$ npm install```<br />
```$ sudo npm start```<br />
Go to static/images and run php server for file system.<br />

##### Backend for clustering:
Go to the clustering folder,<br />
```$ cd examples```<br />
```$ flask run```<br />

For the file server,
```$ cd data```<br />
```$ php -S localhost:8000```<br />

### Usage:
##### FAQ can be found [here.](https://st2-ev.github.io/)
* Upload images via the first app to the servers with their respective disease names.
* Once you have enough images per label, You can train a classifier by selecting all necesssary labels.
* You can deploy the model by scanning the QR code availaible after training is over.
* The QR code can be scanned by the secondary app and be used to run the predictive models on new disease cases.

