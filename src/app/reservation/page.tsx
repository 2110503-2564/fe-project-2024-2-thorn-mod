'use client'
import { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ReservationItem, RestaurantItem } from "../../../interface";
import { addReservation,removeReservation } from "@/redux/features/reservationSlice";
import { useSession } from "next-auth/react";
import getRestaurant from "@/libs/getRestaurant";

export default function Resevation() {
    
    const pullRestaurant  = async (id:string) =>{
        setRestaurant(await getRestaurant(id));

    }

    const makeReserve = async ()=>{
        
    }

    const profile = useSession().data?.user;
    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [dayReserve,setDayReserve] =  useState<Dayjs | null>(null)
    const [restaurant,setRestaurant] = useState<RestaurantItem | null>(null)


    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
           
            {/* Booking */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Reserve Your Restaurant</h1>
                
                <div className="bg-gray-200 p-6 rounded-lg">

                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Select Date & Location</h2>

                    <div className="bg-slate-100 rouded-lg space-x-5 space-x-2
                            w-fit px-10 py-5 flex flex-row justify-center">
                        <div>
                            <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" 
                            onChange={(e) => setNameLastname(e.target.value)} ></TextField>
                        </div>
                        <div>
                            <TextField variant="standard" name="Contact-Number" label="Contact-Number" 
                            onChange={(e) => setTel(e.target.value)}></TextField>
                        </div>
                        
                        <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            
                            <DatePicker className="bg-white" value={dayReserve} onChange={(value)=>{setDayReserve(value); }}/>
                            
                        </LocalizationProvider>
                        </div>
                        
                        <div>
                        <Select className="h-[2em] w-[200px]" variant="standard" name="venue" id="venue" value={restaurant?.name} 
                                onChange={(e)=>pullRestaurant(e.target.value)}
                            >
                                <MenuItem value="67bdc78f52c428af8d90acc2" >The Funky Burger</MenuItem>
                                <MenuItem value="67bdc7c052c428af8d90acc5">Chill & Cheese Pizza Bar</MenuItem>
                                <MenuItem value="67bdc81052c428af8d90acc8">Hipster Hotpot</MenuItem>
                                <MenuItem value="67bdc84952c428af8d90accb">Jazz Noodle House</MenuItem>
                                <MenuItem value="67bdca9052c428af8d90acd0">Pizza Chill Out</MenuItem>

                            </Select>
                        </div>
                    
                    </div>
                </div>

                {/* Booking Button */}
                <button name="Book Venue" 
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg shadow-md text-lg">
                    Reserve
                </button>
            </div>

           
            
        </main>
    );
}
