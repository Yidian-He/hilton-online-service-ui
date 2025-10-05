import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createReservationStore, type ReservationStore } from './reservationStore';
import { createSearchReservationStore, type SearchReservationStore } from './updateReservationStore';
import { createUpdateReservationStore, type UpdateReservationStore } from './updateReservationStore';
import { createCancelReservationStore, type CancelReservationStore } from './updateReservationStore';
import { createReservationListStore, type ReservationListStore } from './reservationListStore';

export interface BoundStore {
    reservation: ReservationStore;
    findActiveReservationByGuest: SearchReservationStore;
    updateReservation: UpdateReservationStore;
    cancelReservation: CancelReservationStore;
    reservationList: ReservationListStore;
}

const reservationStore = createReservationStore();
const searchReservationStore = createSearchReservationStore();
const updateReservationStore = createUpdateReservationStore();
const cancelReservationStore = createCancelReservationStore();
const reservationListStore = createReservationListStore();

export const useBoundStore = create<BoundStore>()(
    subscribeWithSelector(() => ({
        reservation: reservationStore.getState(),
        findActiveReservationByGuest: searchReservationStore.getState(),
        updateReservation: updateReservationStore.getState(),
        cancelReservation: cancelReservationStore.getState(),
        reservationList: reservationListStore.getState(),
    }))
);

reservationStore.subscribe((state: ReservationStore) => {
    useBoundStore.setState((prev) => ({
        ...prev,
        reservation: state,
    }));
});

searchReservationStore.subscribe((state: SearchReservationStore) => {
    useBoundStore.setState((prev) => ({
        ...prev,
        findActiveReservationByGuest: state,
    }));
});

updateReservationStore.subscribe((state: UpdateReservationStore) => {
    useBoundStore.setState((prev) => ({
        ...prev,
        updateReservation: state,
    }));
});

cancelReservationStore.subscribe((state: CancelReservationStore) => {
    useBoundStore.setState((prev) => ({
        ...prev,
        cancelReservation: state,
    }));
});

reservationListStore.subscribe((state: ReservationListStore) => {
    useBoundStore.setState((prev) => ({
        ...prev,
        reservationList: state,
    }));
});

export default useBoundStore;
