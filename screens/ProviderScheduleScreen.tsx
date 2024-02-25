import React from "react";
import Calendar from "../components/Calendar";
import { View } from "react-native";

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
      <Calendar providerId={providerId} />
    </View>
  );
};

export default ProviderScheduleScreen;
