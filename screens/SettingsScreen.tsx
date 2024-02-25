import React from "react";
import { Button } from "react-native-paper";
import { useAuth } from "../state/AuthContext";
import { View } from "react-native";

const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center" ,alignItems:'center'}}>
      <Button style={{ width: 100 }} mode="contained" onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

export default SettingsScreen;
