import axios, { AxiosResponse } from 'axios';

interface Params {
  tr_longitude: string;
  tr_latitude: string;
  bl_longitude: string;
  bl_latitude: string;
}

interface Options {
  params: Params;
  headers: {
    'x-rapidapi-key': string;
    'x-rapidapi-host': string;
  };
}

interface PlaceData {
  // Define the structure of your place data here
  // For example:
  id: string;
  name: string;
  // ... other properties
}

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'; // Add the correct endpoint

const options: Options = {
  params: {
    tr_longitude: '109.262909',
    tr_latitude: '12.346705',
    bl_longitude: '109.095887',
    bl_latitude: '12.113245',
  },
  headers: {
    'x-rapidapi-key': '9b98074ad0msh1405a5056224606p179747jsn2f1674b5f1f1',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};

export const getPlacesData = async (): Promise<PlaceData[] | undefined> => {
  try {
    const response: AxiosResponse<{ data: PlaceData[] }> = await axios.get(URL, options);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};