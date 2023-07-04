import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { styles, toastConfig } from '../../../style';

import { storeToken } from '../../../services/AsyncStorageService';
import { useLoginUserMutation } from '../../../services/userAuthApi';
import { login } from '../../../features/isLoggInSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const UserLoginScreen = () => {

  const dispatch = useDispatch();

  const logIn_data = useSelector(state => state.userLogin.isLoggedIn);

  // console.log("Login data from Login page: ", logIn_data);


  const [loginUser] = useLoginUserMutation();

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const clearTextInput = () => {
    setEmail('');
    setPassword('');
  };

  

  const handleFormSubmit = async () => {
    dispatch(login());
    const formData = { email, password };
    const res = await loginUser(formData);
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token); // Store Token in Storage
      clearTextInput();
      navigation.navigate('UserPanelTab');
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        ...(res.error.data.errors.email
          ? { text1: res.error.data.errors.email[0] }
          : ''),
        ...(res.error.data.errors.password
          ? { text1: res.error.data.errors.password[0] }
          : ''),
        ...(res.error.data.errors.non_field_errors
          ? { text1: res.error.data.errors.non_field_errors[0] }
          : ''),
      });
    }
  };

  return (
    <SafeAreaView>
      
      <Toast config={toastConfig} />

      <ScrollView keyboardShouldPersistTaps="handled">

        <View style={{ marginHorizontal: 30 }}>

          {/* ====================== Icon start here ========================= */}
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            {/* <MaterialIcon name='shopping-bag' color='#2980B9' size={100} /> */}
            <Image
              source={require('../../assets/icons/login2.png')}
              style={{ width: 100, height: 100, marginTop: 20 }}
            />
          </View>
          {/* ====================== Icon start here ========================= */}

          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Write Your Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Write Your Password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ width: 120, alignSelf: 'center', margin: 20 }}>
            <Button title="Login" onPress={handleFormSubmit} color="#2980B9" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('SendPasswordResetEmail');
                }}>
                <Text style={{ fontWeight: 'bold' }}>Forgot Password?</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Registration');
                }}>
                <Text style={{ fontWeight: 'bold' }}>New User? Registration</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
