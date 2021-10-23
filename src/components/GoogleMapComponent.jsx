import React, {useEffect, useState} from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';


const containerStyle = {
  position: 'relative',
  marginTop: '10px',
  height: '500px',
  width: '65%'
};

function GoogleMapComponent() {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => { 
    fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((json) => setData(json.iss_position))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, 5000)
  return () => clearInterval(intervalId);
   }, []);
  
  let latitude = data.latitude
  let longitude = data.longitude

  

  let center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude)
  
  };

  let locations = Object.assign([{}], center)

  const options = {
    imagePath:
      "https://img.icons8.com/color/48/000000/google-maps-new.png", 
  }
  function createKey(location) {
    return location.lat + location.lng
  }
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    
      <GoogleMap id="map"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerClusterer options={options}>
        {(clusterer) =>
            locations.map((location) => (
              <Marker key={createKey(location)} position={locations} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
  ) : <></>
}

export default GoogleMapComponent;
