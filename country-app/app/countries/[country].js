import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageSwiper from "../../components/ImageSwiper";
import { DarkModeContext } from "../../DarkModeContext";

const SingleCountry = () => {
  const { country } = useLocalSearchParams();
  const { isDarkMode } = useContext(DarkModeContext);
  const [states, setStates] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log(states);

  const getCountryInfo = async () => {
    try {
      const response = await axios.get(
        `https://restfulcountries.com/api/v1/countries/${country}`,
        {
          headers: {
            Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
          },
        }
      );
      setCountryInfo(response.data.data);
      if (response?.data?.data?.href?.states) {
        const statesResponse = await axios.get(
          `${response?.data?.data?.href?.states}`,
          {
            headers: {
              Authorization: `Bearer 2086|hh3UjLISywjzPPvwIbxwOsIehwG7isUibctm4RGh`,
            },
          }
        );
        setStates(statesResponse.data.data);
      }
    } catch (error) {
      console.log("Error fetch country", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (country) getCountryInfo();
  }, [country]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    textContainer: {
      flexDirection: "row",
      gap: 5,
    },
    title: {
      fontWeight: 700,
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
    text: {
      fontWeight: 300,
      fontSize: 16,
      color: isDarkMode ? "white" : "black",
    },
  });

  if (isLoading) {
    return (
      <View style={{ marginTop: 20 }}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? "white" : "black"}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageSwiper country={countryInfo} />
        <View style={{ marginVertical: 10, rowGap: 10 }}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Full name:</Text>
            <Text style={styles.text}>{countryInfo.full_name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Capital:</Text>
            <Text style={styles.text}>{countryInfo.capital}</Text>
          </View>
          {countryInfo.description && (
            <View>
              <Text style={styles.title}>Description:</Text>
              <Text style={styles.text}>{countryInfo.description}</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Region:</Text>
            <Text style={styles.text}>{countryInfo?.continent}</Text>
          </View>
          {countryInfo?.current_president?.name && (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Current President:</Text>
              <Text style={styles.text}>
                {countryInfo?.current_president?.name}
              </Text>
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title}>Population:</Text>
            <Text style={styles.text}>{countryInfo.population}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Currency:</Text>
            <Text style={styles.text}>{countryInfo.currency}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Phone Code:</Text>
            <Text style={styles.text}>+{countryInfo.phone_code}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Size:</Text>
            <Text style={styles.text}>{countryInfo.size}</Text>
          </View>
          {countryInfo.independencr_date && (
            <View style={styles.textContainer}>
              <Text style={styles.title}>Independence Day:</Text>
              <Text style={styles.text}>{countryInfo.independence_date}</Text>
            </View>
          )}
        </View>

        {/* Display states if available */}
        {states.length > 0 && (
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.title}>States:</Text>
            {states.map((state, index) => (
              <Text key={index} style={styles.text}>
                {state.name}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
};

export default SingleCountry;
