import {
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import config from '../../config/config';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [state, setState] = useState({
    pickupCords: {
      latitude: 30.7046,
      longitude: 76.7179,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropLocationCords: {
      latitude: 30.7333,
      longitude: 76.7794,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const navigation = useNavigation();

  const {pickupCords, dropLocationCords} = state;

  const mapRef = useRef();

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', {
      getCoordinates: fetchValues,
    });
  };

  const fetchValues = data => {
    console.log('data ====>', data);

    setState({
      pickupCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },

      dropLocationCords: {
        latitude: data.dropLocationCords.latitude,
        longitude: data.dropLocationCords.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#ffff'}
        translucent={true}
      />

      <View
        style={{
          flex: 1,
        }}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={pickupCords}
          ref={mapRef}>
          <Marker coordinate={pickupCords} />

          <Marker coordinate={dropLocationCords} />

          <MapViewDirections
            origin={pickupCords}
            destination={dropLocationCords}
            apikey={config.map_key}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                right: 30,
                left: 30,
                top: 100,
                bottom: 300,
              });
            }}
          />
        </MapView>
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
