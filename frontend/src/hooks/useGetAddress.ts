import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

export const useGetAddress = ({latitude, longitude}: LatLng) => {
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=${Config.GOOGLE_API_KEY}&language=ko`,
        );
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
