import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../../screens/SettingsScreen";
import { Feather } from "@expo/vector-icons";
import ProviderScheduleScreen from "../../screens/ProviderScheduleScreen";
import { useAuth } from "../../state/AuthContext";

const Tab = createBottomTabNavigator();

const ProviderStack: React.FC = () => {
  const { user } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Feather name="calendar" size={24} />,
        }}
        name="Calendar"
        component={ProviderScheduleScreen}
        initialParams={{ providerId: user.id }}
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
};

export default ProviderStack;
