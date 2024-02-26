import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "../types/users";
import { getProviderList } from "../api";
import { Feather } from "@expo/vector-icons";

const ProviderListScreen: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card
          onPress={() =>
            //@ts-ignore for sake of time
            navigation.navigate("ProviderSchedule", {
              providerId: item.id,
            })
          }
          style={{ margin: 10 }}
        >
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.name}</Text>
            <Feather name="arrow-right" size={24} />
          </Card.Content>
        </Card>
      )}
    />
  );
};

export default ProviderListScreen;
