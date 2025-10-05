import dayjs from 'dayjs';
import { findActiveReservationByGuest } from '@/api/Reservation/service';
import { AxiosError } from 'axios';

type Deps = {
  form: any;
  messageApi: any;
  setLoading: (loading: boolean) => void;
  setSearchError: (error: string) => void;
  clearSearchError: () => void;
  setSearchFormErrors: (errors: Record<string, string>) => void;
  clearSearchFormErrors: () => void;
  resetSearchForm: () => void;
  setFoundReservation: (reservation: any | null) => void;
}

const validateForm = (values: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!values.expectedArrivalDate) {
        errors.expectedArrivalDate = 'Date is required';
    }
    if (!values.guestPhone && !values.reservationCode) {
        errors.guestPhone = 'At least one of the field is required';
        errors.reservationCode = 'At least one of the field is required';
    }

    return errors;
}

export const useFindActiveReservationByGuest = (deps: Deps) => {
    const {
        form,
        messageApi,
        setLoading,
        setSearchError,
        clearSearchError,
        setSearchFormErrors,
        clearSearchFormErrors,
        resetSearchForm,
        setFoundReservation
    } = deps;

    const handleSearch = async (values: any) => {
        try {
            clearSearchError();
            clearSearchFormErrors();

            const validationErrors = validateForm(values);
            if (Object.keys(validationErrors).length > 0) {
                setSearchFormErrors(validationErrors);
                messageApi.error('Something went wrong. Please try again.');
                return;
            }

            setLoading(true);

            const response = await findActiveReservationByGuest(
                dayjs(values.expectedArrivalDate).toISOString(),
                values.guestPhone,
                values.reservationCode,
            );

            // On success, show update reservation form
            if (response && response.status == 200) {
                setFoundReservation(response.data);
                resetSearchForm();
            } else {
                messageApi.error('Error');
            }
            resetSearchForm();
            clearSearchFormErrors();
            clearSearchError();
        } catch (err: any) {
            const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
            setSearchError(`${errorMessage}`);
            messageApi.error('Error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchFailed = () => {
        messageApi.error('Error');
    };

    return { handleSearch, handleSearchFailed };
}
