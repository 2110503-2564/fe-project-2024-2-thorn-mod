'use client'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { Select,MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve(){
    const [dayReserve,setDayReserve] =  useState<Dayjs | null>(null)
    const [venue,setVenue] = useState('Tokyo')

    return (
        


        <div className="bg-slate-100 rouded-lg space-x-5 space-x-2
        w-fit px-10 py-5 flex flex-row justify-center">
            <div>
                <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" ></TextField>
            </div>
            <div>
                <TextField variant="standard" name="Contact-Number" label="Contact-Number" ></TextField>
            </div>
            
            <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                
                <DatePicker className="bg-white" value={dayReserve} onChange={(value)=>{setDayReserve(value); alert(value)}}/>
                
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

    );
}