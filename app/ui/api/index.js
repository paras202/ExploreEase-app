import axios from 'axios';

const options = {
  params: {
    tr_longitude: '109.262909',
    tr_latitude: '12.346705',
    bl_longitude: '109.095887',
    bl_latitude: '12.113245',
  },
  headers: {
    'x-rapidapi-key': 'a9d6b71bf0msha66dedcd030fe02p1162e9jsn4541dd5fd368',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};


export const getPlacesData = async () => {
    try {
        const {data: {data}} = await axios.get(URL, options);
        return data;
    } catch (error){
        console.log(error)
    }
}