import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '../../services/AsyncStorageService';
import { useSelector } from 'react-redux';
import { logout } from '../../features/isLoggInSlice';
import { useDispatch } from 'react-redux';


const SideBar = ({ ...props }) => {

  const dispatch = useDispatch();

  const myData = useSelector(state => state.user);
  const myAccessToken = useSelector(state => state.auth);
  // console.log("MyAccessToken: ", myAccessToken.access_token)

  const logIn_data = useSelector(state => state.userLogin.isLoggedIn);

  const handleLogout = async () => {

    dispatch(logout());
    
    await removeToken();

    navigation.navigate('Home');

    console.log('Logout');
  };

  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>

      <View style={{ margin: 15, backgroundColor: '#f6f1f2' }}>

        {/* ====================== User Profile Image start here ========================= */}
        <TouchableOpacity>
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            {/* <MaterialIcon name='shopping-bag' color='#2980B9' size={100} /> */}
            <Image
              source={require('../assets/images/userProfile.png')}
              style={{ width: 100, height: 100, marginTop: 20 }}
            />
          </View>
        </TouchableOpacity>
        {/* ====================== User Profile Image end here ========================= */}


        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 13 }}>
          <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: 'bold', textTransform: 'capitalize' }}>
            {myData.name}
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 5, color: 'blue' }}>{myData.email}</Text>
        </View>


        {/* <Text style={{ fontSize: 16, marginBottom: 5 }}>
          {myAccessToken.access_token}
        </Text> */}

      </View>

      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default SideBar;
