import tensorflow as tf
import numpy as np
import json
import os


def create_probability_model():
    model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(10),
    tf.keras.layers.Softmax()
    ])

    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

    model.compile(optimizer='adam',
              loss=loss_fn,
              metrics=['accuracy'])

    return model

def calc_model_weights():
    mnist = tf.keras.datasets.mnist

    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0

    model = create_probability_model()
    model.fit(x_train, y_train, epochs=5)
    model.save_weights('./checkpoints/model_weights')
    loss, accuracy = model.evaluate(x_test, y_test, verbose=2)
    context ={
        'loss': loss,
        'accuracy': accuracy
    }

    with open("./model.json", "w") as json_file:
        json.dump(context, json_file)

    return context

def classify_digit(img):
    probability_model = create_probability_model()
    probability_model.load_weights('./checkpoints/model_weights')


    predictions = probability_model.predict(img)

    answer = np.argmax(predictions[0])

    print(f'prediction of image : {answer}')
    return answer

if __name__ == '__main__':
    print(__file__)
    print(os.getcwd())