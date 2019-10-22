import data from '../data';

import KDBush from 'kdbush';
import geokdbush from 'geokdbush';

let index = new KDBush(data, p => p.geometry.location.lat, p => p.geometry.location.lng);

export const getNearby = (lat, lng, maxRes, maxDist) => geokdbush.around(index, lat, lng, maxRes, maxDist);

export const getDistance = (lat1, lng1, lat2, lng2) => geokdbush.distance(lat1, lng1, lat2, lng2);

export const getNearest = (userLat, userLng, maxDist) => getNearby(userLat, userLng, Infinity, maxDist)[0];