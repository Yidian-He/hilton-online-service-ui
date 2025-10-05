import { MainContentBGWrapper } from '@/components/layout/MainContentBGWrapper';
import { SuccessReservation } from '@/page/Reservation/components/successReservation';
import { Breadcrumb } from 'antd';
import { memo } from 'react';
import type { Reservation } from '@/model/Reservation';

// Mock reservation data for demo purposes
const mockReservation: Reservation = {
    _id: '507f1f77bcf86cd799439011',
    reservationCode: 'N3X1GG',
    guestName: 'John Doe',
    guestPhone: '+1234567890',
    guestEmail: 'john.doe@example.com',
    expectedArrivalDate: new Date('2025-10-10T18:30:00.000Z'),
    expectedArrivalTime: 'dinner',
    tableSize: 4,
    specialRequests: 'Window seat preferred, celebrating anniversary',
    status: 'requested',
    remarks: '',
    approvedBy: '',
    cancelledBy: '',
    cancelledAt: new Date('1970-01-01T00:00:00.000Z'),
    completedAt: new Date('1970-01-01T00:00:00.000Z'),
    createdAt: new Date('2025-10-10T10:00:00.000Z'),
    updatedAt: new Date('2025-10-10T10:00:00.000Z'),
    arrivalDate: new Date('2025-10-10T18:30:00.000Z')
};

const SuccessReservationDemoComponent = () => {
    const handleCreateAnother = () => {
        console.log('Navigate to create another reservation');
        window.location.href = '/';
    };

    const handleFindReservations = () => {
        // console.log('Navigate to reservations list');
    };

    return (
        <>
            <Breadcrumb
                className='!my-4'
                items={[
                    { title: 'Welcome' },
                    { title: 'Reservation Success Demo' }
                ]}
            />
            <MainContentBGWrapper>
                <SuccessReservation 
                    reservation={mockReservation}
                    onCreateAnother={handleCreateAnother}
                    onFindReservation={handleFindReservations}
                />
            </MainContentBGWrapper>
        </>
    );
};

export const SuccessReservationDemo = memo(SuccessReservationDemoComponent);
