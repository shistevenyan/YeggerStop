from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from google.transit import gtfs_realtime_pb2
from transitFunctions import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


# defining the route that the heroku app url needs to go to yeggerstop.heroku.app/stopresults...
@app.route('/stop_results', methods=['GET'])
@cross_origin(supports_credentials=True)
def stop_results():
    if request.method == 'GET':
        address = request.args.get('address')
        if address:
            return get_data(address)
        return {"results": [], "error_message": "No address given"}, 400


if __name__ == '__main__':
    app.run(debug=True)
