import { MainContentBGWrapper } from '@/components/layout/MainContentBGWrapper';
import { MakeReservationForm } from '@/page/Reservation/components/makeReservation';
import { SuccessReservation } from '@/page/Reservation/components/successReservation';
import { Breadcrumb } from 'antd';
import { memo } from 'react';
import { useBoundStore } from '@/store';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

const ReservationComponent = () => {
    const navigate = useNavigate();
    
    const [
        showSuccessReservation,
        createdReservation,
        setShowSuccessReservation,
        setShowMakeReservationForm,

    ] = useBoundStore(
        useShallow(state => [
            state.reservation.showSuccessReservation,
            state.reservation.createdReservation,
            state.reservation.setShowSuccessReservation,
            state.reservation.setShowMakeReservationForm
        ])
    );

    const handleCreateAnother = () => {
        setShowSuccessReservation(false);
        setShowMakeReservationForm(true);
    };

    const handleFindReservation = () => {
        navigate('/update-reservation');
    };

    return (
        <>
            <Breadcrumb
                // https://www.tailwindcss.cn/docs/configuration#important-modifier
                className='!my-4'
            />
            <MainContentBGWrapper>
                {showSuccessReservation && createdReservation ? (
                    <SuccessReservation 
                        reservation={createdReservation}
                        onCreateAnother={handleCreateAnother}
                        onFindReservation={handleFindReservation}
                    />
                ) : (
                    <MakeReservationForm />
                )}
            </MainContentBGWrapper>
        </>
    );
};

export const Reservation = memo(ReservationComponent);
