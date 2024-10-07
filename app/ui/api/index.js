import axios from 'axios';

const options = {
  params: {
    tr_longitude: '109.262909',
    tr_latitude: '12.346705',
    bl_longitude: '109.095887',
    bl_latitude: '12.113245',
  },
  headers: {
    'x-rapidapi-key': '9e73649d8emsha08d129c09456f7p143b76jsnfe4090fc2a73',
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