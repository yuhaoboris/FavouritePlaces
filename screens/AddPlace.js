import { useEffect, useState } from 'react'
import PlaceForm from '../components/Places/PlaceForm'
import { insertPlace } from '../util/database'

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

  async function createPlaceHandler(place) {
    await insertPlace(place)

    navigation.navigate('AllPlaces')
  }

  return <PlaceForm location={pickedLocation} onCreatePlace={createPlaceHandler} />
}

export default AddPlace
