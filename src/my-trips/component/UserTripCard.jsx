import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
     const [photoUrl,setPhotoUrl] = useState();
        useEffect(()=>{
          trip&&GetPlaceImg();
        },[trip])
      
        const GetPlaceImg=async()=>{
          const data={
            textQuery:trip?.userSelection?.location
          }
          const result= await GetPlaceDetails(data).then(resp=>{
            // console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl);
           
          })
        }
    return(
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all '>
            <img src={photoUrl?photoUrl:'/road-trip-vacation.jpg'} className="object-cover rounded-xl h-[220px]"/>
            <div>
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection.totalDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
            </div>
        </div>
        </Link>
    )
}

export default UserTripCard;