export interface ReservationItem {
  _id: string;
  user: string;
  restaurant: RestaurantItem;
  reservationTime: string;
  createdAt: string;
}

export interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  openTime: string;
  closeTime: string;
  reservation: ReservationItem[]; // Updated to include reservations
  picture: string;
}

export interface RestaurantJson {
  success: boolean;
  count: number;
  data: RestaurantItem[];
}
