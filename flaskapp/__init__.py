from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify')
def classify():
    return render_template('tensorflow/classify.html')