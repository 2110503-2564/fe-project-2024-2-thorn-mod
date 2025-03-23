export interface ReservationJson {
  success: boolean;
  count: number;
  data: ReservationItem[];
}

export interface ReservationItem {
  _id: string;
  restaurant: RestaurantItem;
  reservationDate: string;
  reservationTime: string;
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

export interface ReservationListProps {
  reservationJson: ReservationJson | null;
}

export interface UpdateReservationRequest {
  reservationDate: string;
  reservationTime: string;
}

