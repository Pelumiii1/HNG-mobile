import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from "react-native";

const BottomSheet = ({ closeSheet }) => {
  const slide = useAnimatedValue(900);

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 900,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  // Close bottom sheet
  const handleClose = () => {
    closeSheet();
    slideDown();
  };
  return (
    <Pressable onPress={handleClose} style={styles.backdrop}>
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Languages</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#98A2B3",
              borderRadius: 4,
            }}
            onPress={handleClose}
          >
            <Ionicons name="close-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "120%",
    height: "110%",
    paddingHorizontal: 0,
    paddingTop: 0,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    height: "70%",
    width: "93%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
