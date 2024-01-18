import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/UI/IconButton'

import { Colors } from './constants/colors'
import Map from './screens/Map'
import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { init } from './util/database'
import PlaceDetails from './screens/PlaceDetails'

SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!dbInitialized) {
    return null
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton icon="add" color={tintColor} size={24} onPress={() => navigation.navigate('AddPlace')} />
              ),
            })}></Stack.Screen>
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a new Place',
            }}></Stack.Screen>

          <Stack.Screen name="Map" component={Map}></Stack.Screen>
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
