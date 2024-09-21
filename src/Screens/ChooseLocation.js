import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import AddressPickup from '../Components/AddressPickup';
import CustomBtn from '../Components/CustomBtn';
import { useRoute } from '@react-navigation/native';

const ChooseLocation = ({navigation}) => {
  const [state, setState] = useState({
    pickupCords: {},
    dropLocationCords: {},
  });

  const {params} = useRoute();

  const {pickupCords, dropLocationCords} = state;


  const onDone = () => {
    params?.getCoordinates({
      pickupCords,
      dropLocationCords
    })
    navigation.goBack();
  };

  const fetchAddressCords = (lat, lng) => {
    console.log('lat', lat);
    console.log('lng', lng);

    setState({
      ...state,
      pickupCords : {
        latitude : lat,
        longitude : lng
      }
    })
  };
  const fetchDestinationCords = (lat, lng) => {
    console.log('lat 1', lat);
    console.log('lng 2', lng);

    setState({
      ...state,
      dropLocationCords : {
        latitude : lat,
        longitude : lng
      }
    })
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 24,
        }}>
        <AddressPickup
          key="Pickup"
          placeholderText="Enter pickup location"
          fetchAddress={fetchAddressCords}
        />

        <View
          style={{
            marginBottom: 16,
          }}
        />
        <AddressPickup
          key="dropup"
          placeholderText="Enter destination location"
          fetchAddress={fetchDestinationCords}
        />

        <CustomBtn
          btnText="Done"
          btnStyle={{
            marginTop: 24,
          }}
          onPress={onDone}
        />
      </ScrollView>
    </View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
