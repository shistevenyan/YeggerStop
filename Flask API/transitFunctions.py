import requests
import time
import datetime
import pytz
from math import cos, sqrt
from google.transit import gtfs_realtime_pb2
import timeit

def get_data(address):
    stop_results = {}
    closest_stops = find_closest_stops(address)

    live_stop_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb"
    live_stop_feed = gtfs_realtime_pb2.FeedMessage()
    live_stop_response = requests.get(live_stop_url)
    live_stop_feed.ParseFromString(live_stop_response.content)

    i = 1
    for stop in closest_stops:
        one_stop_result = {}
        bus_times = []
        one_stop_result["stop_id"] = stop['stop_id']
        one_stop_result["stop_name"] = stop["stop_name"]

        for entity in live_stop_feed.entity:
            for each in entity.trip_update.stop_time_update:
                if each.stop_id == stop["stop_id"]:
                    time = each.departure.time
                    if not time:
                        time = each.arrival.time
                    bus_times.append([entity.trip_update.trip.route_id, time])
            one_stop_result["live_bus_times"] = bus_times
        
        stop_results["stop_" + str(i)] = one_stop_result
        i += 1
    
    return stop_results

def find_routes():
    all_trips_url = "https://data.edmonton.ca/resource/ctwr-tvrd.json?$limit=50000"
    all_trips_response = requests.get(all_trips_url)
    all_trips_data = all_trips_response.json()

    static_time_url = "https://data.edmonton.ca/resource/greh-g7ac.json?$limit=2000000"
    static_time_response = requests.get(static_time_url)
    static_time_data = static_time_response.json()

    trip_dict = {}

    i = 0
    for time in static_time_data:
        if time["stop_id"] in trip_dict:
            for data in all_trips_data:
                if time["trip_id"] == data["trip_id"]:
                    trip_dict[time["stop_id"]].append(data["route_id"])
        else:
            for data in all_trips_data:
                if time["trip_id"] == data["trip_id"]:
                    trip_dict[time["stop_id"]] = [data["route_id"]]
        print(i)
        i += 1
    
    for each in trip_dict:
        trip_dict[each] = list(set(trip_dict[each]))

    with open('routes.txt', 'w') as f:
        print(trip_dict, file=f)


def find_closest_stops(address):
    response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyCojSgnjODZ71ywFILooMge4RtrVeDh2TQ')
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

# a = get_data("11713 17 Ave. SW Edmonton, Alberta, Canada")
# print(a)


start = timeit.default_timer()
find_routes()
stop = timeit.default_timer()

print('Time: ', stop - start)
