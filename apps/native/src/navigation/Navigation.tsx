// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import CreateNoteScreen from "../screens/CreateNoteScreen";
// import InsideNoteScreen from "../screens/InsideNoteScreen";
// import LoginScreen from "../screens/LoginScreen";
// import NotesDashboardScreen from "../screens/NotesDashboardScreen";

// const Stack = createNativeStackNavigator();

// const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         id={undefined}
//         initialRouteName="LoginScreen"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen
//           name="NotesDashboardScreen"
//           component={NotesDashboardScreen}
//         />
//         <Stack.Screen name="InsideNoteScreen" component={InsideNoteScreen} />
//         <Stack.Screen name="CreateNoteScreen" component={CreateNoteScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navigation;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AssetListScreen from "../screens/AssetListScreen";
import AddAssetScreen from "../screens/AddAssetScreen";
import AIAdviceScreen from "../screens/AIAdviceScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Assets" component={AssetListScreen} />
      <Tab.Screen name="AddAsset" component={AddAssetScreen} />
      <Tab.Screen name="AIAdvice" component={AIAdviceScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
