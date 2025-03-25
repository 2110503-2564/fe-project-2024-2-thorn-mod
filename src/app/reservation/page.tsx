"use client";
import { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { RestaurantItem } from "../../../interface";
import addReservation from "@/libs/addReservation";
import { useSession } from "next-auth/react";
import getRestaurant from "@/libs/getRestaurant";

export default function Reservation() {
  const { data: session, status } = useSession();
  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [dayReserve, setDayReserve] = useState<Dayjs | null>(null);
  const [reservationTime, setReservationTime] = useState<Dayjs | null>(null);
  const [restaurant, setRestaurant] = useState<string>("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const pullRestaurant = async (id: string) => {
    setSelectedRestaurantId(id);
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const makeReserve = async () => {
    if (
      !nameLastname ||
      !tel ||
      !dayReserve ||
      !selectedRestaurantId ||
      !reservationTime
    ) {
      alert("Please fill in all fields before reserving.");
      return;
    }

    if (!session?.user?.token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const reservationData = {
      reservationDate: dayReserve.format("YYYY-MM-DD"),
      reservationTime: reservationTime.format("HH:mm"),
    };

    try {
      await addReservation(
        selectedRestaurantId,
        reservationData,
        session.user.token
      );
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to make reservation. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 py-20 px-20 w-full">
      <div className="bg-white shadow-lg rounded-lg px-10 py-20 w-full max-w-8xl mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reserve Your Restaurant
        </h1>

        <div className="bg-[#BFCFE7] px-6 py-10 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Select Date & Location
          </h2>

          <div className="bg-slate-100 w-full rounded-lg px-10 py-10 flex flex-col space-y-4">
            <TextField
              className="w-full max-w-2xl"
              variant="standard"
              label="Name - Lastname"
              value={nameLastname}
              onChange={(e) => setNameLastname(e.target.value)}
            />

            <TextField
              className="w-full max-w-2xl"
              variant="standard"
              label="Contact - Number"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="bg-white w-full"
                value={dayReserve}
                onChange={(newValue) => setDayReserve(newValue)}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className="bg-white w-full"
                value={reservationTime}
                onChange={(newValue) => setReservationTime(newValue)}
                ampm={false}
              />
            </LocalizationProvider>
            <Select
              className="h-[2em] w-full"
              variant="standard"
              value={selectedRestaurantId}
              onChange={(e) => {
                setRestaurant(e.target.value);
                pullRestaurant(e.target.value);
              }}
            >
              <MenuItem value="67bdc78f52c428af8d90acc2">
                The Funky Burger
              </MenuItem>
              <MenuItem value="67bdc7c052c428af8d90acc5">
                Chill & Cheese Pizza Bar
              </MenuItem>
              <MenuItem value="67bdc81052c428af8d90acc8">
                Hipster Hotpot
              </MenuItem>
              <MenuItem value="67bdc84952c428af8d90accb">
                Jazz Noodle House
              </MenuItem>
              <MenuItem value="67bdca9052c428af8d90acd0">
                Pizza Chill Out
              </MenuItem>
            </Select>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-[#525CEB] hover:bg-[#F8EDFF] hover:text-[#525CEB] text-white font-semibold py-3 rounded-lg shadow-md text-lg"
          onClick={makeReserve}
        >
          Reserve
        </button>
      </div>
    </main>
  );
}
