import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DashboardScreen from './DashboardScreen';
import SideBar from './SideBar';
import ChangePasswordScreen from './auth/ChangePasswordScreen.jsx';

const Drawer = createDrawerNavigator();

const UserPanelTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#2980B9' },
        headerTintColor: 'white',
      }}>
      <Drawer.Screen name="Profile" component={DashboardScreen} />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerTitle: 'Change Password' }}
      />
    </Drawer.Navigator>
  );
};

export default UserPanelTab;
