import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLoginScreen from './app/screen/auth/UserLoginScreen';
import ShopTab from './app/screen/shop/ShopTab';
import RegistrationScreen from './app/screen/auth/RegistrationScreen';
import SendPasswordResetEmailScreen from './app/screen/auth/SendPasswordResetEmailScreen';
import UserPanelTab from './app/screen/UserPanelTab';
import ItemsPage from './app/screen/shop/Items';
import UpdateItem from './app/screen/shop/UpdateItem';

import { Provider } from 'react-redux';
import { store } from './app/store';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2980B9' },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="ShopTab"
          component={ShopTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{ title: 'User Login' }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: 'Registration', headerBackVisible: false }}
        />

        <Stack.Screen
          name="SendPasswordResetEmail"
          component={SendPasswordResetEmailScreen}
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen
          name="UserPanelTab"
          component={UserPanelTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Items"
          component={ItemsPage}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="UpdateItem"
          component={UpdateItem}
          options={{ headerShown: true }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
