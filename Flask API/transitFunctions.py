import requests
import time
import datetime
import pytz
from math import cos, sqrt
from google.transit import gtfs_realtime_pb2

def get_stop_times(address):
    stop_results = []
    closest_stops = find_closest_stops(address)

    live_stop_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb"
    live_stop_feed = gtfs_realtime_pb2.FeedMessage()
    live_stop_response = requests.get(live_stop_url)
    live_stop_feed.ParseFromString(live_stop_response.content)

    i = 0
    for stop in closest_stops:
        stop_results.append([stop['stop_id'], stop['stop_name']])
        for entity in live_stop_feed.entity:
            for each in entity.trip_update.stop_time_update:
                if each.stop_id == stop["stop_id"]:
                    time = each.departure.time
                    if not time:
                        time = each.arrival.time
                    location = find_bus_location(entity.id)
                    stop_results[i].append([entity.trip_update.trip.route_id, location, time])
        i += 1

    stop_results_json = {}
    for i in range(len(stop_results)):
        stop_results_json[i] = stop_results[i]
    
    return stop_results_json

def find_bus_location(trip_id):
    live_position_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb"
    live_position_feed = gtfs_realtime_pb2.FeedMessage()
    live_position_response = requests.get(live_position_url)
    live_position_feed.ParseFromString(live_position_response.content)

    for entity in live_position_feed.entity:
        if entity.vehicle.trip.trip_id == trip_id:
            bus_position = str(entity.vehicle.position.latitude) + ',' + str(entity.vehicle.position.longitude)
            # response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + str(entity.vehicle.position.latitude) + ',' + str(entity.vehicle.position.longitude) + '&key=AIzaSyCojSgnjODZ71ywFILooMge4RtrVeDh2TQ')
            # reverse_geocode = response.json()
            # bus_position = reverse_geocode['results'][1]['formatted_address']  
            return bus_position


def find_closest_stops(address):
    response = requests.get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyCojSgnjODZ71ywFILooMge4RtrVeDh2TQ')

    lat_long_response = response.json()
    lat_long_address = lat_long_response['results'][0]['geometry']['location']
    static_stop_url = "https://data.edmonton.ca/resource/kgzg-mxv6.json?$limit=10000"
    static_stop_response = requests.get(static_stop_url)
    static_stop_data = static_stop_response.json()
    static_stop_data = sorted(static_stop_data, key=lambda d: distance(d["stop_lat"], d["stop_lon"], lat_long_address['lat'], lat_long_address['lng']))

    return static_stop_data[:3]

def distance(lon1, lat1, lon2, lat2):
    R = 6371000
    lon1 = float(lon1)
    lat1 = float(lat1)
    lon2 = float(lon2)
    lat2 = float(lat2)

    x = (lon2 - lon1) * cos(0.5*(lat2+lat1))
    y = (lat2 - lat1)
    return R * sqrt(x*x + y*y)

a = get_stop_times("2333 Casey Crescent SW. Edmonton, AB, Canada")
print(a)