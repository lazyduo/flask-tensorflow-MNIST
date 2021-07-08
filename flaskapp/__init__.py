from flask import Flask, render_template, request, g
from .tensorflow_app import classify_digit, calc_model_weights
import json
import numpy as np

app = Flask(__name__)

@app.before_request
def before_request():
    print("before request : get model information...")

    with open("model.json", "r") as json_file:
        d = json.load(json_file)
        g.loss = d['loss']
        g.accuracy = d['accuracy']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify')
def classify():
    px_size = range(28)
    loss = '{:.5f}'.format(g.loss)
    accuracy = '{:.5f}'.format(g.accuracy)
    return render_template('tensorflow/classify.html', px_size=px_size, loss=loss, accuracy=accuracy)

@app.route('/getPrediction', methods=['POST'])
def getPrediction():
    data = request.form['bitmap']

    img = np.asarray(list(map(int, data))).reshape((28, 28))
    print(img)
    img = (np.expand_dims(img,0))
    answer= classify_digit(img)

    response = {
        'answer': str(answer)
    }
    return json.dumps(response)

@app.route('/calcModelWeights', methods=['POST'])
def calcModelWeights():

    context = calc_model_weights()
    loss = context['loss']
    accuracy = context['accuracy']
    response = {
        'loss': f'{loss:.5f}',
        'accuracy': f'{accuracy:.5f}',
    }
    print(response)
    return json.dumps(response)