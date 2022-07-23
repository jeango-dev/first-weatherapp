import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState('');

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching users location.');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-3">
        <input
          style={{
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="enter city"
          className="input text-2xl text-center font-medium p-2 w-full shadow-l focus:outline-none capitalize rounded-lg "
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row items-center justify-center mx-2">
        <button
          name="metric"
          className="text-2xl mx-1 text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        {/* <p className="text-xl text-white mx-2">|</p> */}
        <button
          name="imperial"
          className="text-2xl mx-1 text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
