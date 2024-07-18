import React from 'react';
import { Image, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { ColorPalette } from '@/constants/Colors';
import icons from '@/constants/Icons';
const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: ColorPalette.primary,
                tabBarInactiveTintColor: ColorPalette.text,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 10,
                    position: 'relative',
                    top: -12,
                },
                tabBarStyle: {
                    backgroundColor: ColorPalette.greyNav,
                    borderTopWidth: 0,
                    height: 70,
                    borderRadius: 10,
                    overflow: 'hidden',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    elevation: 5, // Android
                    shadowColor: '#000', // iOS
                    shadowOffset: { width: 0, height: 2 }, // iOS
                    shadowOpacity: 0.25, // iOS
                    shadowRadius: 3.5, // iOS
                    margin: 20,
                },
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={focused ? icons.home : icons.homeYellow}
                            style={{ width: 24, height: 24, tintColor: color }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="subscribtion"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Transactions',
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={focused ? icons.send : icons.sendYellow}
                            style={{ width: 24, height: 24, tintColor: color }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Subscriptions',
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={focused ? icons.store : icons.storeYellow}
                            style={{ width: 24, height: 24, tintColor: color }}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}
export default TabsLayout;