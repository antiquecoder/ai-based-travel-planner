import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';


function Header() {
  const [user,setUser] =useState(() => JSON.parse(localStorage.getItem('user')));
  const [openDailog,setOpenDailog]=useState(false);
  
  useEffect(() => {
    console.log(user)
  }, [user])
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

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
      window.location.reload()
    })
  }

  return (
    <div className='p-0 shadow-sm flex justify-between items-center px-2'>
      <img src='/logo.png' className="w-20 h-13"/>
      <div>
        {user ?
          <div className='flex items-center gap-5'>
             <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
              <img src={user?.picture} className="rounded-full w-[38px] h-[38px]" alt="User" />
              </PopoverTrigger>

              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    //setUser(null); // Reset the user state
                    window.location.href = '/create-trip'; // Redirect after state update
                  }}
                  
                >
                  Logout
                </h2>
              </PopoverContent>

              </Popover>
          </div>
          :
          <Button onClick={()=>setOpenDailog(true)}> Sign In</Button>
        }
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
  <DialogContent>
    <DialogHeader>
      <div className="relative">
        <DialogDescription>
          <img src="/logo.png" alt="Logo"/>
          <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
          <p2>Sign in to the App with Google authentication securely</p2>
          <Button 
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center">
            <FcGoogle className="h-7 w-7"/>
            Sign In With Google
          </Button>
        </DialogDescription>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default Header