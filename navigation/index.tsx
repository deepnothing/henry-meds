import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../state/AuthContext";
import ClientStack from "./client";
import ProviderStack from "./provider";
import AuthStack from "./auth";

const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <>{user?.role === "client" ? <ClientStack /> : <ProviderStack />}</>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
