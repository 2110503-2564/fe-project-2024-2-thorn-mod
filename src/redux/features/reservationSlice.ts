import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {ReservationItem} from "../../../interface";

type ReservationState = {
    ReservationItems : ReservationItem[]
}

const initialState:ReservationState ={ReservationItems:[]} ;

export const reservationSlice = createSlice({
    name: "resSlice",
    initialState,
    reducers:{
        addReservation : (state,action:PayloadAction<ReservationItem>)=>{
            const index = state.ReservationItems.findIndex(
                (booking) =>
                    booking.restaurant._id.trim().toLowerCase() === action.payload.restaurant._id.trim().toLowerCase()
            );

            if (index !== -1) {
                state.ReservationItems[index] = action.payload;
            } else {
                state.ReservationItems.push(action.payload);
            }
        },
        removeReservation : (state,action:PayloadAction<ReservationItem>)=>{
            const newState = state.ReservationItems.filter((res)=>{
                return (res._id.trim() !== action.payload._id.trim()
                )
            })

            state.ReservationItems = newState;
        }
    }
})

export const {addReservation,removeReservation} = reservationSlice.actions
export default reservationSlice.reducer