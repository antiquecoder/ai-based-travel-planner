import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList, TravellerType } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDailog,setOpenDailog]=useState(false);

  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user=localStorage.getItem('user');

    if(!user)
    {
      setOpenDailog(true)
      return;
    }


    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
      toast("Please enter all information.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{type}", formData?.type || "Traveler")
      .replace("{location}", formData?.location || "a destination")
      .replace("{totalDays}", formData?.noOfDays || "a few")
      .replace("{traveler}", formData?.traveler || "solo")
      .replace("{budget}", formData?.budget || "flexible");

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
    
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
  
    let parsedTripData;
  
    try {
      console.log("Raw AI Trip Data:", TripData); // ✅ Debugging step
  
      // Check if TripData is already an object
      parsedTripData = typeof TripData === "string" ? JSON.parse(TripData) : TripData;
  
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast("Failed to generate trip. Please try again.");
      setLoading(false);
      return;
    }
  
    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData, // ✅ Safe parsed data
        userEmail: user?.email,
        id: docId,
      });
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast("Error saving trip. Please try again.");
    }
  
    setLoading(false);
    navigate('/view-trip/'+docId)

  };
  

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your preferences🌍✈️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your
        preferences.
      </p>

      <div className="mt-20">
        <div className="mb-[20px]">
          <h2 className="text-xl my-3 font-medium">What type of traveller are you?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {TravellerType.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("type", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.type === item.title && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium mt-[50px]">What is your destination of choice</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onFocus={(e) => e.target.blur()}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-[20px]">
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-700">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[20px]">
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler === item.people && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
              <h2 className="text-sm text-gray-700">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[50px] mt-[50px] justify-end flex">
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
        {loading?
        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>: 'Generate Trip'
        }
          </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
