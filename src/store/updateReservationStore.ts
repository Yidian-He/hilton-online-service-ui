import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs, { Dayjs } from 'dayjs';
import type { Reservation } from '@/model/Reservation';
import type { ReservationFormData } from './reservationStore';

// ------ Search Form Store ------

export interface SearchFormData {
  date?: Dayjs;
  phone?: string;
  reservationCode?: string;
}

export interface SearchReservationState {
  showSearchReservationForm: boolean;
  searchForm: SearchFormData;
  loading: boolean;
  searchError: string | null;
  searchFormErrors: Record<string, string>;
  foundReservation: Reservation | null;
}

export interface SearchReservationActions {
  // UI Actions
  setShowSearchReservationForm: (show: boolean) => void;

  // Search Form Actions
  setSearchForm: (form: Partial<SearchFormData>) => void;
  resetSearchForm: () => void;
  setSearchFormErrors: (errors: Record<string, string>) => void;
  clearSearchFormErrors: () => void;

  // Data Actions
  setFoundReservation: (reservation: Reservation | null) => void;

  // Loading Actions
  setLoading: (loading: boolean) => void;

  // Error Actions
  setSearchError: (error: string | null) => void;
  clearSearchError: () => void;

  // Reset Actions
  clearState: () => void;
}

export type SearchReservationStore = SearchReservationState & SearchReservationActions;

const initialSearchFormData: SearchFormData = {
  date: dayjs(),
  phone: '',
  reservationCode: '',
}

const initialSearchState: SearchReservationState = {
  showSearchReservationForm: false,
  searchForm: initialSearchFormData,
  loading: false,
  searchError: null,
  searchFormErrors: {},
  foundReservation: null,
};

export const createSearchReservationStore = () =>
 create<SearchReservationStore>()(
    devtools(
      (set, get) => ({
        ...initialSearchState,

        // UI Actions
        setShowSearchReservationForm: (show) =>
          set({ showSearchReservationForm: show }, false, 'setShowSearchReservationForm'),

        // Search Form Actions
        setSearchForm: (form) =>
          set((state) => ({
            searchForm: { ...state.searchForm, ...form }
          }), false, 'setSearchForm'),
          
        resetSearchForm: () =>
          set({ searchForm: initialSearchFormData }, false, 'resetSearchForm'),
          
        setSearchFormErrors: (errors) =>
          set({ searchFormErrors: errors }, false, 'setSearchFormErrors'),
          
        clearSearchFormErrors: () =>
          set({ searchFormErrors: {} }, false, 'clearSearchFormErrors'),
        
        // Reservation Actions
        setFoundReservation: (reservation) =>
          set({ foundReservation: reservation || null }, false, 'setFoundReservation'),
          
        // Loading Actions
        setLoading: (loading) =>
          set({ loading: loading }, false, 'setLoading'),
          
        // Error Actions
        setSearchError: (error) =>
          set({ searchError: error }, false, 'setSearchError'),
          
        clearSearchError: () =>
          set({ searchError: null }, false, 'clearSearchError'),
      })
    )
  )

export const useSearchReservationStore = createSearchReservationStore();


// ------ Edit Form Store ------

export interface EditFormData extends ReservationFormData {}

export interface UpdateReservationState {
  showUpdateReservationForm: boolean;
  editForm: EditFormData;
  reservationTobeUpdated: Reservation | null;
  updating: boolean;
  updateError: string | null;
  editFormErrors: Record<string, string>;
}

export interface UpdateReservationActions {
  // UI Actions
  setShowUpdateReservationForm: (show: boolean) => void;

  // Edit Form Actions
  setEditForm: (form: Partial<EditFormData>) => void;
  setEditFormErrors: (errors: Record<string, string>) => void;
  clearEditFormErrors: () => void;
  resetEditForm: () => void;
  
  // Data Actions
  setReservationTobeUpdated: (reservation: Reservation | null) => void;
  
  // Loading Actions
  setUpdating: (updating: boolean) => void;
  
  // Error Actions
  setUpdateError: (error: string | null) => void;
  clearUpdateError: () => void;
  
  // Reset Actions
  clearState: () => void;
}

export type UpdateReservationStore = UpdateReservationState & UpdateReservationActions;

const initialUpdateFormData: EditFormData = {
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    expectedArrivalDate: '',
    expectedArrivalTime: '',
    tableSize: 2,
    specialRequests: ''
};

const initialUpdateState: UpdateReservationState = {
  showUpdateReservationForm: false,
  editForm: initialUpdateFormData,
  reservationTobeUpdated: null,
  updating: false,
  updateError: null,
  editFormErrors: {},
};

export const createUpdateReservationStore = () =>
  create<UpdateReservationStore>()(
    devtools(
      (set, get) => ({
        ...initialUpdateState,
        
        // UI Actions
        setShowUpdateReservationForm: (show) =>
          set({ showUpdateReservationForm: show }, false, 'setShowUpdateReservationForm'),
        
        // Edit Form Actions
        setEditForm: (form) =>
          set((state) => ({
            editForm: { ...state.editForm, ...form }
          }), false, 'setEditForm'),
          
        resetEditForm: () =>
          set({ editForm: initialUpdateFormData }, false, 'resetEditForm'),
          
        setEditFormErrors: (errors) =>
          set({ editFormErrors: errors }, false, 'setEditFormErrors'),
          
        clearEditFormErrors: () =>
          set({ editFormErrors: {} }, false, 'clearEditFormErrors'),

        setReservationTobeUpdated: (reservation) =>
          set({ reservationTobeUpdated: reservation }, false, 'setReservationTobeUpdated'),

        // Loading Actions
        setUpdating: (updating) =>
          set({ updating: updating }, false, 'setUpdating'),
        
        // Error Actions
        setUpdateError: (error) =>
          set({ updateError: error }, false, 'setUpdateError'),
          
        clearUpdateError: () =>
          set({ updateError: null }, false, 'clearUpdateError'),
          
        // Reset Actions
        clearState: () =>
          set(initialUpdateState, false, 'clearState'),
      })
    )
  )


export const useUpdateReservationStore = createUpdateReservationStore();

// ------ Cancel Action Store ------
export interface CancelReservationState {
  cancelling: boolean;
  cancelError: string | null;
}

export interface CancelReservationActions {
  setCancelling: (cancelling: boolean) => void;
  setCancelError: (error: string | null) => void;
  clearCancelError: () => void;
}

export type CancelReservationStore = CancelReservationState & CancelReservationActions;

const initialCancelState: CancelReservationState = {
  cancelling: false,
  cancelError: null,
};

export const createCancelReservationStore = () =>
  create<CancelReservationStore>()(
    devtools(
      (set, get) => ({
        ...initialCancelState,

        // Loading Actions
        setCancelling: (cancelling) =>
          set({ cancelling: cancelling }, false, 'setCancelling'),
        
        // Error Actions
        setCancelError: (error) =>
          set({ cancelError: error }, false, 'setCancelError'),
          
        clearCancelError: () =>
          set({ cancelError: null }, false, 'clearCancelError'),
      })
    )
  )

export const useCancelReservationStore = createCancelReservationStore();
