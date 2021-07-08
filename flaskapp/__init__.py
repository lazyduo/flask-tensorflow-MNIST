from flask import Flask, render_template, request
from .tensorflow_app import classify_digit, calc_model_weights
import json
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify')
def classify():
    px_size = range(28)
    return render_template('tensorflow/classify.html', px_size=px_size)

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

    loss, accuracy = calc_model_weights()
    response = {
        'loss': f'{loss:.2f}',
        'accuracy': f'{accuracy:.2f}',
    }
    return json.dumps(response)