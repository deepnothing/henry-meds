import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../state/AuthContext";
import { UserRole } from "../types/users";

const WelcomeScreen: React.FC = () => {
  const { login } = useAuth();
  const handleLogin = (role: UserRole) =>
    login({ id: `${role[0]}1`, role: role });

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <Text variant="displayMedium">I am a..</Text>
      <View style={{ gap: 20 }}>
        {["provider", "client"].map((type: UserRole, index: number) => (
          <Button
            key={index}
            onPress={() => handleLogin(type)}
            mode="contained"
          >
            {type}
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
