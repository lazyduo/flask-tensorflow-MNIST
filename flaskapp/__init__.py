from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify')
def classify():
    px_size = range(28)
    return render_template('tensorflow/classify.html', px_size=px_size)