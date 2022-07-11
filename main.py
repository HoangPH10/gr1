from flask import Flask,request, jsonify
from flask_cors import CORS, cross_origin
from load_model import  load_model
from base64_to_image import base64_to_image
from preprocessing import preprocess_image
import  tensorflow as tf
from predict import decode_batch_predictions

import numpy as np
import matplotlib.pyplot as plt


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/predict", methods=["POST"])
def predict():
    base64_to_image(request.get_json()['base64'], './image.png')
    image = preprocess_image('./image.png')
    image = tf.expand_dims(image, axis=0)

    prediction_model_saved = load_model()

    preds = prediction_model_saved.predict(image)
    pred_texts = decode_batch_predictions(preds)

    print(pred_texts)


    # for i in range(1):
    #     img = image[i]
    #     img = tf.image.flip_left_right(img)
    #     img = tf.transpose(img, perm=[1, 0, 2])
    #     img = (img * 255.0).numpy().clip(0, 255).astype(np.uint8)
    #     img = img[:, :, 0]
    #
    #     title = f"Prediction: {pred_texts[i]} "
    #     plt.imshow(img, cmap="gray")
    #     plt.title (title)
    #     plt.axis("off")
    # plt.show()

    print(pred_texts)



    return jsonify({'predicted': pred_texts[0]})



if __name__ == '__main__':
    app.run(debug=True,host='10.0.206.58', port=5000)
    # image = preprocess_image('./img_test.png')
    # image = tf.expand_dims(image, axis=0)
    #
    # prediction_model_saved = load_model()
    #
    # preds = prediction_model_saved.predict(image)
    # pred_texts = decode_batch_predictions(preds)
    #
    # print(pred_texts)
    #
    # for i in range(1):
    #     img = image[i]
    #     img = tf.image.flip_left_right(img)
    #     img = tf.transpose(img, perm=[1, 0, 2])
    #     img = (img * 255.0).numpy().clip(0, 255).astype(np.uint8)
    #     img = img[:, :, 0]
    #
    #     title = f"Prediction: {pred_texts[i]} "
    #     plt.imshow(img, cmap="gray")
    #     plt.title(title)
    #     plt.axis("off")
    # plt.show()
    #app.run(debug=True, host='10.0.206.58', port=5000)
