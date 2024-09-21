import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Screens/Home'
import ChooseLocation from './src/Screens/ChooseLocation'

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='home' screenOptions={{
          headerShown : false
        }}>
          <Stack.Screen name='home' component={Home}></Stack.Screen>
          <Stack.Screen name='chooseLocation' component={ChooseLocation} options={{
            headerShown : true
          }}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})