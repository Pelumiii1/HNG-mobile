import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to My App</Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://github.com/Pelumiii1/HNG-mobile")
        }
        style={{ padding: 10, backgroundColor: "blue", borderRadius: 5 }}
      >
        <Text style={{ color: "white" }}>Visit GitHub Repo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://hng.tech/hire/react-native-developers")
        }
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "green",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Visit HNG Hire Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
