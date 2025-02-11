import { Ionicons } from "@expo/vector-icons";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DarkModeContext } from "../../DarkModeContext";

const CountriesLayout = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const router = useRouter();
  const { country } = useLocalSearchParams();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: isDarkMode ? "#000F24" : "white",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: "80%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 18,
            color: isDarkMode ? "white" : "black",
          }}
        >
          {country || "Country Details"}
        </Text>
      </View>
      <Slot />
    </SafeAreaView>
  );
};

export default CountriesLayout;
