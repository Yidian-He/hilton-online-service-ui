import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Reservation } from '@/model/Reservation';

export interface ReservationFormData {
    guestName: string;
    guestPhone: string;
    guestEmail: string;
    expectedArrivalDate: string; // ISO string
    expectedArrivalTime: string; 
    tableSize: number;
    specialRequests: string;
}

export interface ReservationState {
    // UI State
    showMakeReservationForm: boolean;
    isReservationModalVisible: boolean;
    showSuccessReservation: boolean;
    
    // Form State
    reservationForm: ReservationFormData;
    
    // Data State
    reservations: Reservation[];
    selectedReservation: Reservation | null;
    reservationCount: number;
    createdReservation: Reservation | null;
    
    // Loading States
    isLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isFetching: boolean;
    
    // Error State
    error: string | null;
    formErrors: Record<string, string>;
}

export interface ReservationActions {
    // UI Actions
    setShowMakeReservationForm: (show: boolean) => void;
    setIsReservationModalVisible: (visible: boolean) => void;
    setShowSuccessReservation: (show: boolean) => void;
    setShowFindReservationForm: (show: boolean) => void;
    
    // Form Actions
    setReservationForm: (form: Partial<ReservationFormData>) => void;
    resetReservationForm: () => void;
    setFormErrors: (errors: Record<string, string>) => void;
    clearFormErrors: () => void;
    
    // Data Actions
    setReservations: (reservations: Reservation[]) => void;
    addReservation: (reservation: Reservation) => void;
    updateReservation: (id: string, reservation: Partial<Reservation>) => void;
    removeReservation: (id: string) => void;
    setSelectedReservation: (reservation: Reservation | null) => void;
    setReservationCount: (count: number) => void;
    setCreatedReservation: (reservation: Reservation | null) => void;
    
    // Loading Actions
    setIsLoading: (loading: boolean) => void;
    setIsCreating: (creating: boolean) => void;
    setIsUpdating: (updating: boolean) => void;
    setIsDeleting: (deleting: boolean) => void;
    setIsFetching: (fetching: boolean) => void;
    
    // Error Actions
    setError: (error: string | null) => void;
    clearError: () => void;
    
    // Reset Actions
    resetReservationState: () => void;
}

export type ReservationStore = ReservationState & ReservationActions;

const initialFormData: ReservationFormData = {
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    expectedArrivalDate: '',
    expectedArrivalTime: '',
    tableSize: 2,
    specialRequests: ''
};

const initialState: ReservationState = {
    showMakeReservationForm: false,
    isReservationModalVisible: false,
    showSuccessReservation: false,
    reservationForm: initialFormData,
    reservations: [],
    selectedReservation: null,
    reservationCount: 0,
    createdReservation: null,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isFetching: false,
    error: null,
    formErrors: {},
};

export const createReservationStore = () =>
    create<ReservationStore>()(
        devtools(
            (set, get) => ({
                ...initialState,
                
                // UI Actions
                setShowMakeReservationForm: (show) =>
                    set({ showMakeReservationForm: show }, false, 'setShowMakeReservationForm'),
                
                setIsReservationModalVisible: (visible) =>
                    set({ isReservationModalVisible: visible }, false, 'setIsReservationModalVisible'),
                
                setShowSuccessReservation: (show) =>
                    set({ showSuccessReservation: show }, false, 'setShowSuccessReservation'),
                
                // Form Actions
                setReservationForm: (form) =>
                    set((state) => ({
                        reservationForm: { ...state.reservationForm, ...form }
                    }), false, 'setReservationForm'),
                
                resetReservationForm: () =>
                    set({ reservationForm: initialFormData }, false, 'resetReservationForm'),
                
                setFormErrors: (errors) =>
                    set({ formErrors: errors }, false, 'setFormErrors'),
                
                clearFormErrors: () =>
                    set({ formErrors: {} }, false, 'clearFormErrors'),
                
                // Data Actions
                setReservations: (reservations) =>
                    set({ 
                        reservations,
                        reservationCount: reservations.length 
                    }, false, 'setReservations'),
                
                addReservation: (reservation) =>
                    set((state) => ({
                        reservations: [...state.reservations, reservation],
                        reservationCount: state.reservationCount + 1,
                    }), false, 'addReservation'),
                
                updateReservation: (id, updatedReservation) =>
                    set((state) => ({
                        reservations: state.reservations.map((reservation) =>
                            reservation._id === id ? { ...reservation, ...updatedReservation } : reservation
                        ),
                    }), false, 'updateReservation'),
                
                removeReservation: (id) =>
                    set((state) => ({
                        reservations: state.reservations.filter((reservation) => reservation._id !== id),
                        reservationCount: state.reservationCount - 1,
                    }), false, 'removeReservation'),
                
                setSelectedReservation: (reservation) =>
                    set({ selectedReservation: reservation }, false, 'setSelectedReservation'),
                
                setReservationCount: (count) =>
                    set({ reservationCount: count }, false, 'setReservationCount'),
                
                setCreatedReservation: (reservation) =>
                    set({ createdReservation: reservation }, false, 'setCreatedReservation'),
                
                // Loading Actions
                setIsLoading: (loading) =>
                    set({ isLoading: loading }, false, 'setIsLoading'),
                
                setIsCreating: (creating) =>
                    set({ isCreating: creating }, false, 'setIsCreating'),
                
                setIsUpdating: (updating) =>
                    set({ isUpdating: updating }, false, 'setIsUpdating'),
                
                setIsDeleting: (deleting) =>
                    set({ isDeleting: deleting }, false, 'setIsDeleting'),
                
                setIsFetching: (fetching) =>
                    set({ isFetching: fetching }, false, 'setIsFetching'),
                
                // Error Actions
                setError: (error) =>
                    set({ error }, false, 'setError'),
                
                clearError: () =>
                    set({ error: null }, false, 'clearError'),
                
                // Reset Actions
                resetReservationState: () =>
                    set(initialState, false, 'resetReservationState'),
            })
        )
    );
