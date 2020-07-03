import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import GalleryScreen from './screens/GalleryScreen';
import AboutUsScreen from './screens/AboutUsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Cursos" component={CoursesScreen} />
        <Drawer.Screen name="Galeria" component={GalleryScreen} />
        <Drawer.Screen name="Quienes somos" component={AboutUsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
