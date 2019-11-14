from flask import Flask, send_file

import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend 2 is working"

@app.route("/image-cluster/<string:folder_name>", methods=['GET'])
def hello(folder_name):
    if (os.path.isdir("../data/"+folder_name)):
        os.system("python example_api_minimal.py "+folder_name)
    else:
        return "error:Folder does not exist"
    return send_file("../results/result.png", mimetype='image/png')


if __name__ == "__main__":
    app.run()
