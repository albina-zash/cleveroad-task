import React, { useEffect, useState } from 'react';


const CurrentLocation = () => {
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

return (
  <>
  <div className="header location" id="location">
  <p>ISS is now located at:</p>
  <div id="long_lat">latitude:{data.latitude}, longitude:{data.longitude}</div> 
  </div>
</>
)
};

export default CurrentLocation;