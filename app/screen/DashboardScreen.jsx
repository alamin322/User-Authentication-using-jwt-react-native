import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../services/AsyncStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import { setUserAccessToken } from '../../features/authSlice';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const [token, setToken] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setToken({
          access: access,
          refresh: refresh,
        });
        dispatch(setUserAccessToken({ access_token: access }));
      }
    })();
  }, []);

  const { data, isSuccess } = useGetLoggedUserQuery(token.access);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
  });
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity>
        <Button title='Back to home' onPress={() => {navigation.navigate('Home')}}/>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default DashboardScreen;


