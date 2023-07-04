import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../services/AsyncStorageService';
import { useSelector } from 'react-redux';


const HomeScreen = () => {
  const logIn_data = useSelector(state => state.userLogin.isLoggedIn);
  // console.log("Login data from Home: ", logIn_data);

  const navigation = useNavigation();

  const checkYourItems = () => {
    if (logIn_data) {
      navigation.navigate("Items");
    } else {
      navigation.navigate("UserLogin");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>HomeScreen</Text>
      <View style={{ marginTop: 13 }}>
        <Button title='Check your Items' onPress={checkYourItems} />
      </View>
    </View>
  );
};

export default HomeScreen;
