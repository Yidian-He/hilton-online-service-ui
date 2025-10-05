import { HTTPClient } from '../client';
import type { Reservation } from '@/model/Reservation';

export interface CreateReservationRequest {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  tableSize: number;
  expectedArrivalDate: Date;
  expectedArrivalTime: string;
  specialRequests?: string;
}

export interface UpdateReservationRequest {
  guestName?: string;
  guestEmail?: string;
  tableSize?: number;
  expectedArrival?: Date;
  specialRequests?: string;
}

export type variables = {
  date: string;
  status: string;
  searchText: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
};

// Temporarily make this fixed for now
export const queryString = `
  query FindReservations {
    reservations {
      _id
      guestName
      guestPhone
      guestEmail
      status
      expectedArrivalDate
      expectedArrivalTime
      tableSize
      reservationCode
      specialRequests
  } 
}`

export interface GraphqlRequest {
  query: string;
  variables?: variables;
}

export interface GraphqlResponse {
  data: Reservation[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } | null;
}

// ------- Guest Functions -------

// Guest Function: Create a new reservation
export const createReservation = async (data: CreateReservationRequest) => {
  try {
    const response = await HTTPClient.post('/reservations', data);
    return response;
  } catch (error) {
    console.error('Error making reservation:', error);
    throw error;
  }
};

// Guest Function: Find reservations by date, phone, or reservation code
export const findActiveReservationByGuest = async (date?: string, phone?: string, reservationCode?: string) => {
  try {
    const params: Record<string, string> = {};
    if (date) params.date = date;
    if (phone) params.phone = phone;
    if (reservationCode) params.reservationCode = reservationCode;

    console.log('params', params);

    const response = await HTTPClient.get('/reservations/guest', { params });
    return response;
  } catch (error) {
    console.error('Error finding reservation:', error);
    throw error;
  }
};

// Guest Function: Update a reservation
export const updateReservation = async (id: string, data: UpdateReservationRequest) => {
  try {
    const response = await HTTPClient.patch(`/reservations/guest/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }
};

// Guest Function: Cancel a reservation
export const cancelReservationByGuest = async (id: string, data: {}) => {
  try {
    const response = await HTTPClient.patch(`/reservations/guest/${id}/cancel`, data);
    return response;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;
  }
};

// ------- Employee Functions -------

// Employee Function: Get reservation details by ID
export const findReservationById = async (id: string) => {
  try {
    const response = await HTTPClient.get(`/reservations/admin/${id}`);
    return response;
  } catch (error) {
    console.error('Error finding reservation by ID:', error);
    throw error;
  }
};

// Employee Function: Update reservation status
export const updateReservationStatus = async (id: string, data: { status: string }) => {
  try {
    const response = await HTTPClient.patch(`/reservations/admin/${id}/status`, data);
    return response;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw error;
  }
};

// Employee Function: Get all reservations
export const graphql = async (data: GraphqlRequest) => {
  try {
    const response = await HTTPClient.post<GraphqlResponse>('/reservations/admin/graphql', data);
    return response;
  } catch (error) {
    console.error('Error finding all reservations:', error);
    throw error;
  }
};
