import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "../dsfh-6ead5-firebase-adminsdk-w2fd1-7059e11b70.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
