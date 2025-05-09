// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';

// const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

// const options = (page: number) => ({
//   params: {
//     tr_longitude: '76.78',
//     tr_latitude: '32.55',
//     bl_longitude: '73.85',
//     bl_latitude: '29.93',
//     limit: 12,
//     offset: (page - 1) * 12
//   },
//   headers: {
//     'x-rapidapi-key': '9b98074ad0msh1405a5056224606p179747jsn2f1674b5f1f1',
//     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
//   }
// });

// interface TouristPlace {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   description?: string;
//   image: string;
//   website: string;
//   address: string;
// }

// const Destination: React.FC = () => {
//   const [places, setPlaces] = useState<TouristPlace[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchPlacesData = async () => {
//       try {
//         const { data: { data, paging } } = await axios.get(API_URL, options(page));
//         const transformedData = data
//           .filter((place: any) => !isNaN(parseFloat(place.latitude)) && !isNaN(parseFloat(place.longitude)))
//           .map((place: any) => ({
//             id: place.location_id,
//             name: place.name,
//             latitude: parseFloat(place.latitude),
//             longitude: parseFloat(place.longitude),
//             description: place.description || 'No description available',
//             image: place.photo?.images?.large?.url || '/placeholder-image.jpg',
//             website: place.website || '#',
//             address: place.address || 'Address not available'
//           }));
        
//         setPlaces(transformedData);
//         setTotalPages(Math.ceil(paging.total_results / 12));
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch tourist places');
//         setLoading(false);
//       }
//     };

//     fetchPlacesData();
//   }, [page]);

//   if (loading) return <p className="text-center py-4">Loading...</p>;
//   if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Discover Tourist Places</h2>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
//         {places.map((place) => (
//           <div key={place.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//             <Image
//               src={place.image}
//               alt={place.name}
//               width={400}
//               height={300}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">
//                 <Link href={`/places/${place.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
//                   {place.name}
//                 </Link>
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{place.description}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{place.address}</p>
//               <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Visit Website</a>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center space-x-2 mt-8">
//         <button
//           onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
//         >
//           Previous
//         </button>
//         <span className="text-lg text-gray-700 dark:text-gray-300">{page} of {totalPages}</span>
//         <button
//           onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Destination;


"use client"


// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useTouristPlaces } from './TouristPlaceContent';

// const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';
// const API_KEY = '9b98074ad0msh1405a5056224606p179747jsn2f1674b5f1f1';

// const options = (page: number) => ({
//   params: {
//     tr_longitude: '76.78',
//     tr_latitude: '32.55',
//     bl_longitude: '73.85',
//     bl_latitude: '29.93',
//     limit: 12,
//     offset: (page - 1) * 12
//   },
//   headers: {
//     'x-rapidapi-key': API_KEY,
//     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
//   }
// });

// const Destination: React.FC = () => {
//   const { places, setPlaces, initialPlacesFetched, setInitialPlacesFetched } = useTouristPlaces();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPlacesData = useCallback(async (currentPage: number) => {
//     setLoading(true);
//     try {
//       const { data: { data, paging } } = await axios.get(API_URL, options(currentPage));
//       const transformedData = data
//         .filter((place: any) => !isNaN(parseFloat(place.latitude)) && !isNaN(parseFloat(place.longitude)))
//         .map((place: any) => ({
//           id: place.location_id,
//           name: place.name,
//           latitude: parseFloat(place.latitude),
//           longitude: parseFloat(place.longitude),
//           description: place.description || 'No description available',
//           image: place.photo?.images?.large?.url || '/placeholder-image.jpg',
//           website: place.website || '#',
//           address: place.address || 'Address not available'
//         }));
      
//       setPlaces(transformedData);
//       setTotalPages(Math.ceil(paging.total_results / 12));
//       setInitialPlacesFetched(true);
//     } catch (err) {
//       console.error('Failed to fetch places:', err);
//       setError('Failed to fetch tourist places');
//     } finally {
//       setLoading(false);
//     }
//   }, [setPlaces, setInitialPlacesFetched]);

//   useEffect(() => {
//     if (!initialPlacesFetched || page !== 1) {
//       fetchPlacesData(page);
//     } else {
//       setLoading(false);
//     }
//   }, [page, initialPlacesFetched, fetchPlacesData]);

//   const handlePreviousPage = () => {
//     setPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   if (loading) return <p className="text-center py-4">Loading...</p>;
//   if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Discover Tourist Places</h2>

//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
//         {places.map((place) => (
//           <div key={place.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//             <Image
//               src={place.image}
//               alt={place.name}
//               width={400}
//               height={300}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">
//                 <Link href={`/places/${place.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
//                   {place.name}
//                 </Link>
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{place.description}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{place.address}</p>
//               <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Visit Website</a>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center space-x-2 mt-8">
//         <button
//           onClick={handlePreviousPage}
//           disabled={page === 1}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
//         >
//           Previous
//         </button>
//         <span className="text-lg text-gray-700 dark:text-gray-300">{page} of {totalPages}</span>
//         <button
//           onClick={handleNextPage}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Destination;

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useTouristPlaces } from './TouristPlaceContent';

const API_URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';
const API_KEY = '9b98074ad0msh1405a5056224606p179747jsn2f1674b5f1f1';

const options = (page: number) => ({
  params: {
    tr_longitude: '76.78',
    tr_latitude: '32.55',
    bl_longitude: '73.85',
    bl_latitude: '29.93',
    limit: 12,
    offset: (page - 1) * 12
  },
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
});

const Destination: React.FC = () => {
  const { places, setPlaces, initialPlacesFetched, setInitialPlacesFetched } = useTouristPlaces();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPlaces, setAllPlaces] = useState<any[]>([]);

  const fetchPlacesData = useCallback(async (currentPage: number) => {
    setLoading(true);
    try {
      const { data: { data, paging } } = await axios.get(API_URL, options(currentPage));
      const transformedData = data
        .filter((place: any) => !isNaN(parseFloat(place.latitude)) && !isNaN(parseFloat(place.longitude)))
        .map((place: any) => ({
          id: place.location_id,
          name: place.name,
          latitude: parseFloat(place.latitude),
          longitude: parseFloat(place.longitude),
          description: place.description || 'No description available',
          image: place.photo?.images?.large?.url || '/placeholder-image.jpg',
          website: place.website || '#',
          address: place.address || 'Address not available'
        }));
      
      setAllPlaces(prevPlaces => {
        const newPlaces = [...prevPlaces];
        newPlaces.splice((currentPage - 1) * 12, 12, ...transformedData);
        return newPlaces;
      });
      setTotalPages(Math.ceil(paging.total_results / 12));
      setInitialPlacesFetched(true);
    } catch (err) {
      console.error('Failed to fetch places:', err);
      setError('Failed to fetch tourist places');
    } finally {
      setLoading(false);
    }
  }, [setInitialPlacesFetched]);

  useEffect(() => {
    if (!initialPlacesFetched || !allPlaces[(page - 1) * 12]) {
      fetchPlacesData(page);
    } else {
      setLoading(false);
    }
  }, [page, initialPlacesFetched, fetchPlacesData, allPlaces]);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setPlaces(allPlaces.slice(startIndex, endIndex));
  }, [page, allPlaces, setPlaces]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Discover Tourist Places</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {places.map((place) => (
          <div key={place.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Image
              src={place.image}
              alt={place.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/places/${place.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {place.name}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{place.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{place.address}</p>
              <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Visit Website</a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
        >
          Previous
        </button>
        <span className="text-lg text-gray-700 dark:text-gray-300">{page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Destination;