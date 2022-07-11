import cv2
import numpy as np
import base64

def base64_to_image(encoded_data, filename):
    nparr = np.fromstring(base64.b64decode(str(encoded_data)), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_ANYCOLOR)
    return cv2.imwrite(filename, img)