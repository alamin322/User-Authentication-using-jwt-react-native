import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../services/AsyncStorageService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const ShopTab = () => {

  // const [usertoken, setUserToken] = useState({});

  const navigation = useNavigation();
  const logIn_data = useSelector(state => state.userLogin.isLoggedIn);
  console.log("Login data from ShopTab: ", logIn_data);
  const user_data = useSelector(state => state.user);

  // useEffect(() => {
  //   (async () => {
  //     const token = await getToken();
  //     if (token) {
  //       const { access, refresh } = JSON.parse(token);
  //       setUserToken({
  //         access: access,
  //         refresh: refresh,
  //       });
  //     } else {
  //       setUserToken({});
  //     }
  //   })();
  // }, []);

  const handleUserAuth = () => {
    if (logIn_data) {
      navigation.navigate('UserPanelTab', { screen: 'Dashboard' });
    } else {
      navigation.navigate('UserLogin');
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2980B9' },
        headerTintColor: 'white',
        drawerStyle: { backgroundColor: '#F0EDED' },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          drawerActiveTintColor: 'black',
          headerRight: () => (
            <TouchableWithoutFeedback onPress={handleUserAuth}>
              {logIn_data ? (
                // <Text
                //   style={{
                //     color: 'white',
                //     fontSize: 18,
                //     paddingRight: 20,
                //     fontWeight: 'bold',
                //     textTransform: 'capitalize',
                //   }}>
                //   {user_data.name}
                // </Text>

                <View style={{}}>
                  {/* ====================== Icon start here ========================= */}
                  <TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                      {/* <MaterialIcon name='shopping-bag' color='#2980B9' size={100} /> */}
                      <Image
                        source={require("../../assets/images/userProfile2.png")}
                        style={{ width: 40, height: 40, marginTop: 13, marginRight: 25, borderWidth: 1, borderColor: "white", borderRadius: 20}}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* ====================== Icon start here ========================= */}
                </View>

              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    paddingRight: 20,
                    fontWeight: 'bold',
                  }}>
                  Login
                </Text>
              )}
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopTab;


