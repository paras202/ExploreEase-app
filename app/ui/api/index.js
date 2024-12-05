import axios from 'axios';

const options = {
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


export const getPlacesData = async () => {
    try {
        const {data: {data}} = await axios.get(URL, options);
        return data;
    } catch (error){
        console.log(error)
    }
}