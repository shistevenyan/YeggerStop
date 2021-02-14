import requests
import time
import datetime
import pytz
from math import cos, asin, sqrt
from google.transit import gtfs_realtime_pb2


def get_stops(stop_id):
    """gets the trip of a particular bus"""

    # gets when the bus is expected to come and to what stop
    live_stop_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb"
    live_stop_feed = gtfs_realtime_pb2.FeedMessage()
    live_stop_response = requests.get(live_stop_url)
    live_stop_feed.ParseFromString(live_stop_response.content)

    print(live_stop_feed)


def find_closest_stops(address):
    response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyCojSgnjODZ71ywFILooMge4RtrVeDh2TQ')

    latLongResponse = response.json()
    latLongAddress = latLongResponse['results'][0]['geometry']['location']
    static_stop_url = "https://data.edmonton.ca/resource/kgzg-mxv6.json?$limit=10000"
    static_stop_response = requests.get(static_stop_url)
    static_stop_data = static_stop_response.json()
    static_stop_data = sorted(static_stop_data, key=lambda d: distance(d["stop_lat"], d["stop_lon"], latLongAddress['lat'], latLongAddress['lng']))
    print(static_stop_data[:3])


def distance(lon1, lat1, lon2, lat2):
    R = 6371000  # radius of the Earth in m
    lon1 = float(lon1)
    lat1 = float(lat1)
    lon2 = float(lon2)
    lat2 = float(lat2)

    x = (lon2 - lon1) * cos(0.5*(lat2+lat1))
    y = (lat2 - lat1)
    return R * sqrt(x*x + y*y)


find_closest_stops("11713 17 Ave. SW Edmonton, AB")
