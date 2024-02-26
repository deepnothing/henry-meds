import React from "react";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

interface Legend {
  color: string;
  title: string;
}

const Legend: React.FC = () => {
  const legend: Legend[] = [
    {
      color: "blue",
      title: "Selected",
    },
    {
      color: "#90EE90",
      title: "Has Availibility",
    },
    {
      color: "red",
      title: "Today",
    },
  ];
  return (
    <View style={{ margin: 10, gap: 10 }}>
      <Text variant="titleMedium">Legend</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {legend.map((i, index) => (
          <Chip key={index} style={{backgroundColor:'lightgrey'}}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 100,
                backgroundColor: i.color,
              }}
            />
            <Text>&nbsp;{i.title}</Text>
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default Legend;
