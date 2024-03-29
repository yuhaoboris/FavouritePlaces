import { StyleSheet, View, Alert, Text, Image } from 'react-native'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { getAddress, getMapPreview } from '../../util/location'

function LocationPicker({ lat, lng, onPickLocation }) {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
  const [pickedLocation, setPickedLocation] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    if (lat && lng) {
      setPickedLocation({ lat, lng })
    }
  }, [lat, lng])

  useEffect(() => {
    async function fetchAddress() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        onPickLocation({ ...pickedLocation, address })
      }
    }

    fetchAddress()
  }, [pickedLocation, onPickLocation])

  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions', 'You need to grant location perssion to use this app.')
      return false
    }

    return true
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      {/* <Text style={styles.address}>{pickedLocation.address}</Text> */}

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary500,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default LocationPicker
