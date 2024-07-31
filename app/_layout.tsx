import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";

const _layout = () => {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="(transactions)"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "ios" }}
        />
      </Stack>
    </Provider>
  );
};

export default _layout;
