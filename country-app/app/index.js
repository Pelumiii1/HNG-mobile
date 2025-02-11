import { Feather, Fontisto } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet from "../components/BottomSheet";
import { DarkModeContext } from "../DarkModeContext";

export default function HomeScreen() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log(isDarkMode);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        "https://restfulcountries.com/api/v1/countries",
        {
          headers: {
            Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
          },
        }
      );
      setCountries(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error getting all countries", error);
      setIsLoading(false);
    }
  };

  const countrySearch = async () => {
    try {
      const response = await axios.get(
        `https://restfulcountries.com/api/v1/countries/${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
          },
        }
      );
      setCountries(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error getting all countries", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (countries.length === 0) getCountries();
  }, [countries]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
      backgroundColor: isDarkMode ? "#000F24" : "white",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      backgroundColor: "#F2F4F7",
      paddingHorizontal: "10",
      borderRadius: 4,
      marginTop: 10,
    },
    search: {
      color: "#667085",
      // width: "100%",
      textAlign: "center",
    },
    button: {
      borderColor: "#A9B8D4",
      borderRadius: 4,
      borderWidth: 0.5,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: !isDarkMode ? "black" : "white" }}>Explore</Text>
        <Pressable onPress={toggleDarkMode}>
          <Feather
            name={isDarkMode ? "moon" : "sun"}
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </Pressable>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="#667085" />
        <TextInput
          name
          placeholder="Search Country"
          style={styles.search}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsBottomSheetOpen(true)}
        >
          <Fontisto
            name="world-o"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={{ color: !isDarkMode ? "black" : "white" }}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather
            name="filter"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={{ color: !isDarkMode ? "black" : "white" }}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Country List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={isDarkMode ? "white" : "black"}
        />
      ) : (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={() =>
                router.push({
                  pathname: `/countries/[country]`,
                  params: { country: item.name },
                })
              }
            >
              <Image
                source={{ uri: `${item.href.flag}` }}
                style={{ width: 40, height: 40, borderRadius: 7 }}
              />
              <View>
                <Text style={{ color: !isDarkMode ? "black" : "white" }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#667085" }}>{item.capital}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {isBottomSheetOpen && (
        <BottomSheet closeSheet={() => setIsBottomSheetOpen(false)} />
      )}
    </SafeAreaView>
  );
}
