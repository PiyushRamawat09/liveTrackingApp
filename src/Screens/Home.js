import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import config from '../../config/config';
import {useNavigation} from '@react-navigation/native';

import {getCurrentLocation, locationPermission} from '../helperFunction';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Home = () => {
  const [state, setState] = useState({
    currentLoc: {
      latitude: 30.7046,
      longitude: 76.7179,
    },
    dropLocationCords: {},

    coordinates: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),

    time: 0,
    distance: 0,
    heading : 0
  });

  useEffect(() => {
    getCurrentLocationCords();
  }, []);

  const getCurrentLocationCords = async () => {
    const locationPermissionStatus = await locationPermission();

    console.log('locationPermissionStatus', locationPermissionStatus);

    if (locationPermissionStatus) {
      const {latitude, longitude, heading} = await getCurrentLocation();

      console.log('currentPosition latitude ===> ', latitude);
      console.log('currentPosition longitude ===> ', longitude);

      animate(latitude, longitude);

      setState({
        ...state,
        currentLoc: {
          latitude: latitude,
          longitude: longitude,
        },
        coordinates: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
        heading : heading
      });
    }
  };

  const navigation = useNavigation();

  const {currentLoc, dropLocationCords, coordinates, time, distance, heading} = state;

  const mapRef = useRef();
  const markRef = useRef();

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', {
      getCoordinates: fetchValues,
    });
  };

  const fetchValues = data => {
    console.log('data ====>', data);

    setState({
      currentLoc: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },

      dropLocationCords: {
        latitude: data.dropLocationCords.latitude,
        longitude: data.dropLocationCords.longitude,
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocationCords();
    }, 6000);

    return () => clearInterval(interval);
  });

  const animate = (latitude, longitude) => {
    const {newCoordinate} = {latitude, longitude};

    if (Platform.OS == 'android') {
      if (markRef.current) {
        markRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinates.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetTimeDistance = (d, t) => {
    setState({
      ...state,
      distance: d,
      time: t,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#ffff'}
        translucent={true}
      />

      {distance !== 0 && time !== 0 && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 16,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '600',
            }}>
            Time left : {time.toFixed(0)} min
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '600',
            }}>
            Distance : {distance.toFixed(0)} km
          </Text>
        </View>
      )}

      <View
        style={{
          flex: 1,
        }}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: currentLoc.latitude,
            longitude: currentLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          ref={mapRef}>
          <Marker.Animated ref={markRef} coordinate={currentLoc}>
            <Image source={require('../Image/bike.png')} style = {{
              width : 40,
              height : 40,
              transform : [{rotate : `${heading}deg`}]
            }} />
          </Marker.Animated>

          {Object.keys(dropLocationCords).length > 0 && (
            <Marker coordinate={dropLocationCords} />
          )}

          {Object.keys(dropLocationCords).length > 0 && (
            <MapViewDirections
              origin={currentLoc}
              destination={dropLocationCords}
              apikey={config.map_key}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onReady={result => {
                fetTimeDistance(result.distance, result.duration);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  right: 30,
                  left: 30,
                  top: 100,
                  bottom: 300,
                });
              }}
            />
          )}
        </MapView>

        <TouchableOpacity
          onPress={onCenter}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Image source={require('../Image/greenIndicator.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          padding: 30,
          width: '100%',
          borderTopEndRadius: 28,
          borderTopStartRadius: 28,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: '600',
          }}>
          Where are you going... ?
        </Text>

        <TouchableOpacity
          onPress={onPressLocation}
          activeOpacity={0.8}
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            marginTop: 16,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '400',
            }}>
            Choose where are your location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
