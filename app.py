from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/api", methods=['GET'])
@cross_origin()
def index():
    return {
        "title": "Hello"
    }


if __name__ == "__main__":
    app.run()
