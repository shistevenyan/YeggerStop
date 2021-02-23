from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from google.transit import gtfs_realtime_pb2
from transitFunctions import *

app = Flask(__name__)


@app.route('/address', methods=['GET', 'POST'])

def address():
    if request.method == 'GET':
        address = request.args.get('address', None)
        if address:
            return address
        return "No place information is given"


if __name__ == '__main__':
    app.run(debug=True)