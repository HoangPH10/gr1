import tensorflow as tf


def load_model():
    with open('./weightsBethham_prediction_model.json','r') as json_file:
        json_saved_model = json_file.read()
    prediction_model_saved = tf.keras.models.model_from_json(json_saved_model)
    prediction_model_saved.load_weights('./weightsBethham_prediction_model.hdf5')
    return prediction_model_saved;
