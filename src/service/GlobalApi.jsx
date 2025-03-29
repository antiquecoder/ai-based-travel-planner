// GlobalApi.jsx
import axios from "axios";

// Include API key in the URL
const BASE_URL = `https://places.googleapis.com/v1/places:searchText?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

const config = {
  headers: {
    'Content-Type': 'application/json',
    // Request only necessary fields
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
  }
};

// Fixed: Include MANDATORY `textQuery` and recommended `maxResultCount`
export const GetPlaceDetails = (data) => 
  axios.post(
    BASE_URL,
    {
      textQuery: data.textQuery, // REQUIRED
      maxResultCount: 5, // Add this to avoid errors
    },
    config
  );

// Verify photo URL formatting
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;