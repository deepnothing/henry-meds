import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../../screens/SettingsScreen";
import NestedClientStack from "./NestedClientStack";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ClientStack: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{
        tabBarIcon: () => <Feather name="user" size={24} />,
        headerShown: false,
      }}
      name="Providers"
      component={NestedClientStack}
    />

    <Tab.Screen
      options={{
        tabBarIcon: () => <Feather name="settings" size={24} />,
      }}
      name="Settings"
      component={SettingsScreen}
    />
  </Tab.Navigator>
);

export default ClientStack;
