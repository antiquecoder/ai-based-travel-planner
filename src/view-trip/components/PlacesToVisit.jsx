import React from "react";
import PlaceCardItem from "./PlaceCardItem"; // Ensure this path is correct

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className="font-bold text-lg">Places To Visit</h2>

            <div>
                {trip?.tripData?.itinerary?.length > 0 ? (
                    trip.tripData.itinerary.map((item, index) => (
                        <div key={index} >
                            <h2 className="font-medium text-lg">{item?.day}</h2>
                            <div className="grid md:grid-cols-2">
                                {item?.plan?.map((place, idx) => (
                                    <div key={idx}>
                                        <h2 className="font-medium text-sm text-orange-600">{place?.time}</h2>
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No itinerary available.</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;
