import React,{useEffect, useState} from 'react';

const CurrentTime = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
   
    
   useEffect(() => {
    const intervalId = setInterval(() => { 
    fetch("http://api.open-notify.org/iss-now.json")
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, 5000)
return () => clearInterval(intervalId);
}, []);

   let date = new Date(data.timestamp * 1000)
   let dayWeek = ["Sun", "Mon", "Thue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var day_name = date.getDate();
   var month = months[date.getMonth()];
   var year = date.getFullYear();

   var hour = date.getHours();
   var min = date.getMinutes();

return (
    <div className="header time" id="time-wrapper">
    <span id="time">Current UTC time: {hour + ':' + min} </span>
    <span id="#date">{dayWeek + ', ' +  day_name + ' ' + month + ' ' + year}</span>
</div>
);
};

export default CurrentTime;

