import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import config from '../../config/config';

const AddressPickup = ({placeholderText, fetchAddress = () => {}}) => {
  const onPressAddress = (data, details) => {
    console.log('details ===> ', details);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    fetchAddress(lat, lng);
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        onPress={onPressAddress}
        fetchDetails = {true}
        query={{
          key: config.map_key,
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'white',
          },
          textInput: {
            height: 48,
            color: 'black',
            fontSize: 16,
            backgroundColor: '#F3F3F3',
          },
        }}
      />
    </View>
  );
};

export default AddressPickup;

const styles = StyleSheet.create({
  container: {flex: 1},
});
