import { useEffect, useState } from 'react'
import PlaceForm from '../components/Places/PlaceForm'

function AddPlace({ route }) {
  const [pickedLocation, setPickedLocation] = useState(null)

  useEffect(() => {
    if (route.params) {
      setPickedLocation({
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      })
    }
  }, [route, setPickedLocation])

  return <PlaceForm location={pickedLocation} />
}

export default AddPlace
