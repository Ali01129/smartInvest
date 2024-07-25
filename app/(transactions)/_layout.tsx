import React from 'react';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
        <Stack>
            <Stack.Screen name="deposit" options={{ headerShown: false,animation:'ios' }} />
            <Stack.Screen name="send" options={{ headerShown: false,animation:'ios' }} />
            <Stack.Screen name="withdraw" options={{ headerShown: false,animation:'ios' }} />
            <Stack.Screen name="conversion" options={{ headerShown: false,animation:'ios' }} />
            <Stack.Screen name="depositSuccessFull" options={{ headerShown: false,animation:'ios' }} />
            <Stack.Screen name="sendConfirmation" options={{ headerShown: false,animation:'ios' }} />
        </Stack>
    );
}
export default _layout;