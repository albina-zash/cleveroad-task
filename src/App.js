import React from 'react';
import  './styles/App.css'
import CurrentLocation from './components/CurrentLocation';
import CurrentTime from './components/CurrentTime';
import GoogleMapComponent from './components/GoogleMapComponent';
import PeopleInSpace from './components/PeopleInSpace';

function App() {
  return (
    <div id="wrap">
    <CurrentLocation />
    <CurrentTime />
    <GoogleMapComponent />
    <PeopleInSpace />
    </div>
  );
};

export default App;
