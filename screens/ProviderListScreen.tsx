import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "../types/users";
import { getProviderList } from "../api";
import { Feather } from "@expo/vector-icons";

const ProviderListScreen: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getProviderList()
      .then((data) => {
        setProviders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <FlatList
      data={providers}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            margin: 10,
            borderRadius: 10,
            padding: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("ProviderSchedule", {
              providerId: item.id,
            })
          }
        >
          <Text>{item.name}</Text>
          <Feather name="arrow-right" size={24} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProviderListScreen;
