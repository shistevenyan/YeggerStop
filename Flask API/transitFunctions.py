import requests
import time
from datetime import datetime
import pytz
from math import cos, sqrt
from google.transit import gtfs_realtime_pb2

def get_data(address):
    stop_results = []
    closest_stops = find_closest_stops(address)

    with open('routes.txt', 'r') as inf:
        route_dict = eval(inf.read())

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
        one_stop_result["lat"] = float(stop["stop_lat"])
        one_stop_result["long"] = float(stop["stop_lon"])

        available_routes = []
        for route in route_dict[stop['stop_id']]:
            if len(route) == 1:
                route = "00" + route
            if len(route) == 2:
                route = "0" + route
            available_routes.append(route)
            
        one_stop_result["available_routes"] = available_routes
        
        for entity in live_stop_feed.entity:
            for each in entity.trip_update.stop_time_update:
                if each.stop_id == stop["stop_id"]:
                    time = each.departure.time
                    if not time:
                        time = each.arrival.time
                    
                    timezone = pytz.timezone("Canada/Mountain")
                    read_time = datetime.fromtimestamp(int(time), timezone).strftime("%H:%M")
                    bus_times.append([entity.trip_update.trip.route_id, read_time])
            one_stop_result["live_bus_times"] = bus_times
        
        stop_results.append(one_stop_result)

    data = {"results": stop_results}
    
    return data


def find_routes():
    # function that allows me to update and see which bus routes are available at bus stops
    # Saves that data in a text file called routes.txt for faster access
    # Data saved in the file is in the format of:  {stop_id: [route_ids], stop_id: [route_ids]}

    all_trips_url = "https://data.edmonton.ca/resource/ctwr-tvrd.json?$limit=50000"
    all_trips_response = requests.get(all_trips_url)
    all_trips_data = all_trips_response.json()

    static_time_url = "https://data.edmonton.ca/resource/greh-g7ac.json?$limit=2000000"
    static_time_response = requests.get(static_time_url)
    static_time_data = static_time_response.json()

    trip_dict = {}

    for time in static_time_data:
        if time["stop_id"] in trip_dict:
            for data in all_trips_data:
                if time["trip_id"] == data["trip_id"]:
                    trip_dict[time["stop_id"]].append(data["route_id"])
        else:
            for data in all_trips_data:
                if time["trip_id"] == data["trip_id"]:
                    trip_dict[time["stop_id"]] = [data["route_id"]]
    
    for each in trip_dict:
        trip_dict[each] = list(set(trip_dict[each]))

    with open('routes.txt', 'w') as f:
        print(trip_dict, file=f)


def find_closest_stops(address):
    # find the closest three bus stops to an address
    # First switch the address to (lat, long) using Google Map Geocode API
    # Then traverse through all stops in Edmonton to find the closest to the given (lat, long)

    response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyCojSgnjODZ71ywFILooMge4RtrVeDh2TQ')
    lat_long_response = response.json()
    lat_long_address = lat_long_response['results'][0]['geometry']['location']
    static_stop_url = "https://data.edmonton.ca/resource/kgzg-mxv6.json?$limit=10000"
    static_stop_response = requests.get(static_stop_url)
    static_stop_data = static_stop_response.json()
    static_stop_data = sorted(static_stop_data, key=lambda d: distance(d["stop_lat"], d["stop_lon"], lat_long_address['lat'], lat_long_address['lng']))

    return static_stop_data[:3]

def distance(lon1, lat1, lon2, lat2):
    # distance formula that calculates between two (lat, long) positions
    
    R = 6371000
    lon1 = float(lon1)
    lat1 = float(lat1)
    lon2 = float(lon2)
    lat2 = float(lat2)

    x = (lon2 - lon1) * cos(0.5*(lat2+lat1))
    y = (lat2 - lat1)
    return R * sqrt(x*x + y*y)

a = get_data("11713 17 Ave. SW Edmonton, Alberta, Canada")
print(a)
