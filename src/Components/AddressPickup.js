import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import config from '../../config/config';

const AddressPickup = ({placeholderText, fetchAddress = () => {}}) => {
  const onPressAddress = (data, details) => {
    console.log('details ===> ', details);

    const resLength = details.address_components;
    let zipCode = '';

    let filterResCity = details.address_components.filter(val => {
      console.log('Filter data ==>', val);

      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }

      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }

      return false;
    });

    console.log('zip code ===>', zipCode);

    let dataTextCityObj =
      filterResCity.length > 0
        ? filterResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];

    let cityText = dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17 ? dataTextCityObj.short_name : dataTextCityObj.long_name;

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    fetchAddress(lat, lng, zipCode, cityText);
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        onPress={onPressAddress}
        fetchDetails={true}
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
