import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {BookingItem} from "../../../interface";

type BookState = {
    bookItems : BookingItem[]
}

const initialState:BookState ={bookItems:[]} ;

export const bookSlice = createSlice({
    name: "bookSlice",
    initialState,
    reducers:{
        addBooking : (state,action:PayloadAction<BookingItem>)=>{
            const index = state.bookItems.findIndex(
                (booking) =>
                    booking.venue.trim().toLowerCase() === action.payload.venue.trim().toLowerCase() &&
                    booking.bookDate.trim() === action.payload.bookDate.trim()
            );

            if (index !== -1) {
                state.bookItems[index] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking : (state,action:PayloadAction<BookingItem>)=>{
            const newState = state.bookItems.filter((booking)=>{
                return (booking.tel.trim() !== action.payload.tel.trim() ||
                booking.venue.trim().toLowerCase() !== action.payload.venue.trim().toLowerCase() ||
                booking.bookDate.trim() !== action.payload.bookDate.trim() ||
                booking.nameLastname.trim() !== action.payload.nameLastname.trim()
                )
            })

            state.bookItems = newState;
        }
    }
})

export const {addBooking,removeBooking} = bookSlice.actions
export default bookSlice.reducer