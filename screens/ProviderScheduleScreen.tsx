import React from "react";
import Calendar from "../components/Calendar";
import { View } from "react-native";
import Legend from "../components/Legend";

interface ProviderScheduleProps {
  route: {
    params: {
      providerId: string;
    };
  };
}

const ProviderScheduleScreen: React.FC<ProviderScheduleProps> = ({ route }) => {
  const { providerId } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Legend />
      <Calendar providerId={providerId} />
    </View>
  );
};

export default ProviderScheduleScreen;
