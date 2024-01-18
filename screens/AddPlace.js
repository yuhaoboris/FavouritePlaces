import { useEffect, useState } from 'react'
import PlaceForm from '../components/Places/PlaceForm'

function AddPlace({ navigation, route }) {
  const [pickedLocation, setPickedLocation] = useState(null)

  useEffect(() => {
    if (route.params) {
      setPickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      })
    }
  }, [route, setPickedLocation])

  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', {
      place,
    })
  }

  return <PlaceForm location={pickedLocation} onCreatePlace={createPlaceHandler} />
}

export default AddPlace
