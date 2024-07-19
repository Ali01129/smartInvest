import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'ios' }} />
      <Stack.Screen name="settings" options={{ headerShown: false, animation: 'ios' }} />
    </Stack>
  );
};

export default _layout;