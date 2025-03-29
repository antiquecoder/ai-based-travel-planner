export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:"Stay conscious of costs",
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:"Keep cost on the average side",
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💎',
    },
]

export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:"A sole traveles",
        icon:'🙋🏾‍♀️',
        people:'1',
    },
    {
        id:2,
        title:'A Couple',
        desc:"Two travelers",
        icon:'👫🏾',
        people:'2',
    },
    {
        id:3,
        title:'Family',
        desc:"A group of fun loving adv",
        icon:'🏡',
        people:'3 to 5 people',
    },
    {
        id:4,
        title:'Friends',
        desc:"A bunch of thrill-seekers",
        icon:'👩‍👩‍👦‍👦',
        people:'5 to 12 people',
    },


]

export const TravellerType=[
    {
        id: 1,
        title: 'Cultural Explorer',
        desc: "History, markets, and local traditions.",
        icon: '🏛️',
    },
    {
        id: 2,
        title: 'Adventurous Nomad',
        desc: "Thrills on a outdoor activities and local eats.",
        icon: '⛺',
    },
    {
        id: 3,
        title: 'Foodie Indulgence',
        desc: "Fine dining, food tours, and gourmet experiences.",
        icon: '🍽️',
    },

]


export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details,Place Image Url, Geo Coordinates,ticket Pricing,rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.'