import React from "react";
import AppNavigator from "./navigation";
import { AuthProvider } from "./state/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
