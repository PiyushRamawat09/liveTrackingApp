import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';


export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS == 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );

        if (permissionStatus == 'granted') {
          return resolve('granted');
        }

        reject('Permission not granted');
      } catch (err) {
        return reject(err);
      }
    }

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }

        return reject('Permission not granted');
      })
      .catch(err => {
        console.log('Ask Location permission error : ', err);

        return reject(err);
      });
  });

export const getCurrentLocation = () =>
  new Promise(async (resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading : position.coords.heading,
        };

        resolve(coords);
      },

      err => {
        reject(err);
      },

      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
