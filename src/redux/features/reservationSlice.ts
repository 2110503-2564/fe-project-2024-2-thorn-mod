import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interface";

// Define the state type
type ReservationState = {
  ReservationItems: ReservationItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

// Initial state
const initialState: ReservationState = {
  ReservationItems: [],
  status: "idle",
  error: null,
};

// Modify the thunk to accept token separately
export const addReservationAsync = createAsyncThunk(
  "resSlice/addReservationAsync",
  async (
    {
      reservationData,
      token,
    }: { reservationData: ReservationItem; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { restaurant } = reservationData;

      // Use the token passed directly from the component
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Make the API call
      const res = await fetch(
        `http://localhost:5000/api/v1/restaurants/${restaurant._id}/reservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error || "Failed to make reservation");
      }

      // Return the data to be used in the reducer
      return reservationData;
    } catch (error) {
      console.error("Error booking:", error);
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }
);

// Create the slice
export const reservationSlice = createSlice({
  name: "resSlice",
  initialState,
  reducers: {
    // Keep your sync actions
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const index = state.ReservationItems.findIndex(
        (booking) =>
          booking.restaurant._id.trim().toLowerCase() ===
          action.payload.restaurant._id.trim().toLowerCase()
      );
      if (index !== -1) {
        state.ReservationItems[index] = action.payload;
      } else {
        state.ReservationItems.push(action.payload);
      }
    },
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      const newState = state.ReservationItems.filter((res) => {
        return res._id.trim() !== action.payload._id.trim();
      });
      state.ReservationItems = newState;
    },
    // Add action to clear errors
    clearReservationError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Handle async action states
    builder
      .addCase(addReservationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReservationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Use the same logic as in your sync addReservation action
        const index = state.ReservationItems.findIndex(
          (booking) =>
            booking.restaurant._id.trim().toLowerCase() ===
            action.payload.restaurant._id.trim().toLowerCase()
        );
        if (index !== -1) {
          state.ReservationItems[index] = action.payload;
        } else {
          state.ReservationItems.push(action.payload);
        }
      })
      .addCase(addReservationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { addReservation, removeReservation, clearReservationError } =
  reservationSlice.actions;

// Export reducer
export default reservationSlice.reducer;
