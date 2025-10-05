import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Reservation } from '@/model/Reservation';

export type ReservationListState = {
    reservations: Reservation[];
    currentReservation?: Reservation | undefined;
    showContactInfoForm: boolean;
    searching: boolean;
    error: string;
}

export type ReservationListActions = {
    setReservations: (reservations: Reservation[]) => void;
    setCurrentReservation: (currentReservation: Reservation) => void;
    setShowContactInfoForm: (showContactInfoForm: boolean) => void;
    setSearching: (searching: boolean) => void;
    setError: (error: string) => void;
    clearError: () => void;
    resetForm: () => void;
}

export type ReservationListStore = ReservationListState & ReservationListActions;

const initialReservationListState: ReservationListState = {
    reservations: [],
    currentReservation: undefined,
    showContactInfoForm: false,
    searching: false,
    error: ''
}

export const createReservationListStore = () =>
  create<ReservationListStore>()(
    devtools(
      (set, get) => ({
        ...initialReservationListState,

        setReservations: (reservations) =>
          set({ reservations: reservations }, false, 'setReservations'),
        
        setCurrentReservation: (currentReservation) =>
          set({ currentReservation }, false, 'setCurrentReservation'),

        setShowContactInfoForm: (show) =>
          set({ showContactInfoForm: show }, false, 'setShowContactInfoForm'),
        
        setSearching: (searching) =>
          set({ searching }, false, 'setSearching'),
        
        setError: (error) =>
          set({ error }, false, 'setError'),
        
        clearError: () =>
          set({ error: '' }, false, 'clearError'),
        
        resetForm: () =>
          set({
            ...initialReservationListState,
          }, false, 'resetForm'),
      })
    )
  );

export const useReservationListStore = createReservationListStore();
