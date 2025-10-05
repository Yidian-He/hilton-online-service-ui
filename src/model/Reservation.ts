export type Reservation = {
      _id: string;
      guestName: string;
      guestPhone: string;
      guestEmail: string;
      expectedArrivalDate: Date;
      expectedArrivalTime: string;
      tableSize: number;
      specialRequests: string;
      status: string;
      reservationCode: string;
      remarks: string;
      approvedBy: string;
      cancelledBy: string;
      cancelledAt: Date;
      completedAt: Date;
      createdAt: Date;
      updatedAt: Date;
      // Virtual fields
      arrivalDate: Date;
};

export const ReservationStatus = {
      REQUESTED: 'requested',
      APPROVED: 'approved',
      CANCELLED: 'cancelled',
      COMPLETED: 'completed',
};
