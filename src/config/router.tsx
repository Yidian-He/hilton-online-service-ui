import { Reservation } from '@/page/Reservation';
import { SuccessReservationDemo } from '@/page/Reservation/components/successReservationDemo';
import { UpdateReservation } from '@/page/Reservation/components/updateReservation';
import { ReservationList } from '@/page/Reservation/components/reservationList';
import { Dashboard } from '@/page/Dashboard';
import { Login } from '@/page/Login';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/',
                index: true,
                element: <Reservation />,
            },
            {
                path: '/success-demo',
                element: <SuccessReservationDemo />,
            },
            {
                path: '/update-reservation',
                element: <UpdateReservation />,
            },
            {
                path: '/reservation-list',
                element: <ReservationList />,
            },
        ],
    },
    // {
    //     path: '/healthcheck',
    //     element: <p>OK</p>,
    // },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
