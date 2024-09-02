import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'home'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'speaker'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="extra"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'menu'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
