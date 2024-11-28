import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

export const useGetAddress = ({latitude, longitude}: LatLng) => {
  const [result, setResult] = useState('');

  console.log(latitude, longitude);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=AIzaSyCKvToJCExs9hcPjn7pDJsuK88ACoTS6w8&language=ko`,
        );

        console.log(data);

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setResult(errorMessages.CANNOT_GET_ADDRESS);
        }
      }
    })();
  }, [latitude, longitude]);

  return result;
};
