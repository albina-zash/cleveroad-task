import React, {useState, useEffect} from 'react'
import icon from '../images/icon.png'

function PeopleInSpace() {

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {

    const intervalId = setInterval(() => {

    fetch("http://api.open-notify.org/astros.json")
    .then((response) => response.json())
    .then((json) => setData(json.people))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

}, 5000)

    return () => clearInterval(intervalId);
}, []);

let count =0
    return (
        <div className="people-wr">
        <div id="people">
            {data.map(item => (
                <div className="people-block" key={item.name} cound={count++}>
                    {item.name}
                    <img className="imgPeople" style={{height:45, width:45}} src={icon} alt="icon" />
                </div>
            ))}
        <div id="count-people">Total amount: {count} people on ISS</div>
    </div>
    </div>
    )
};

export default PeopleInSpace;