'use client'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ReservationItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
    const [nameLastname, setNameLastname] = useState("");
    const [tel, setTel] = useState("");
    const [dayReserve,setDayReserve] =  useState<Dayjs | null>(null)
    const [venue,setVenue] = useState('Tokyo')

    const dispatch = useDispatch<AppDispatch>();
    const makeBooking = ()=>{
        if (venue && dayReserve ){
            const booking : BookingItem = {
                nameLastname : nameLastname,
                tel : tel,
                venue : venue,
                bookDate : dayjs(dayReserve).format("YYYY/MM/DD")
    
            }
            dispatch(addBooking(booking));
        }
        
       

        
    };

    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
           
            {/* Booking */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-10">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Reserve Your Venue</h1>
                
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
                        <Select className="h-[2em] w-[200px]" variant="standard" name="venue" id="venue" value={venue} 
                                onChange={(e)=>setVenue(e.target.value)}
                            >
                                <MenuItem value="Bloom" >The Bloom Pavilion</MenuItem>
                                <MenuItem value="Spark">Spark Space</MenuItem>
                                <MenuItem value="GrandTable">The Grand Table</MenuItem>

                            </Select>
                        </div>
                    
                    </div>
                </div>

                {/* Booking Button */}
                <button name="Book Venue" onClick={makeBooking}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg shadow-md text-lg">
                    Book Venue
                </button>
            </div>

           
            
        </main>
    );
}
