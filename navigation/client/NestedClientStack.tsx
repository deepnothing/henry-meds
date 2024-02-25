import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProviderScheduleScreen from "../../screens/ProviderScheduleScreen";
import ProviderListScreen from "../../screens/ProviderListScreen";

const Stack = createNativeStackNavigator();

const NestedClientStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProviderListScreen"
        options={{ title: "Providers" }}
        component={ProviderListScreen}
      />
      <Stack.Screen
        name="ProviderSchedule"
        options={{ title: "Provider Schedule" }}
        component={ProviderScheduleScreen}
      />
    </Stack.Navigator>
  );
};
export default NestedClientStack;
