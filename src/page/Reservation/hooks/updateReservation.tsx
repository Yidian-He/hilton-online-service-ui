import dayjs from 'dayjs';
import { updateReservation, type UpdateReservationRequest, cancelReservationByGuest } from '@/api/Reservation/service';
import { AxiosError } from 'axios';

type Deps = {
    form: any;
    messageApi: any;
    setUpdating: (updating: boolean) => void;
    setUpdateError: (error: string) => void;
    clearUpdateError: () => void;
    setEditFormErrors: (errors: Record<string, string>) => void;
    clearEditFormErrors: () => void;
    resetEditForm: () => void;
    setCancelError: (error: string | null) => void;
    clearCancelError: () => void;
    setCancelling: (cancelling: boolean) => void;
    onUpdateSuccess?: () => void;
    onCancelSuccess?: () => void;
};

const validateForm = (values: any): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.guestName?.trim()) {
        errors.guestName = 'Guest name is required';
    }

    if (values.guestEmail?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.guestEmail)) {
        errors.guestEmail = 'Please enter a valid email address';
    }

    if (!values.expectedArrivalDate) {
        errors.expectedArrivalDate = 'Expected arrival date is required';
    } else if (dayjs(values.expectedArrivalDate).isBefore(dayjs().add(1, 'day'), 'day')) {
        errors.expectedArrivalDate = 'Arrival date must be at least tomorrow';
    } else if (dayjs(values.expectedArrivalDate).isAfter(dayjs().add(30, 'day'))) {
        errors.expectedArrivalDate = 'Arrival date cannot be more than 30 days in advance';
    }

    if (!values.expectedArrivalTime) {
        errors.expectedArrivalTime = 'Please select arrival time';
    }

    if (!values.tableSize || values.tableSize < 1) {
        errors.tableSize = 'Table size must be at least 1';
    } else if (values.tableSize > 20) {
        errors.tableSize = 'Table size cannot exceed 20 people';
    }

    return errors;
};

export const useUpdateReservation = (deps: Deps) => {
    const {
        form,
        messageApi,
        setUpdating,
        setUpdateError,
        clearUpdateError,
        setEditFormErrors,
        clearEditFormErrors,
        resetEditForm,
        setCancelError,
        clearCancelError,
        setCancelling,
        onUpdateSuccess,
        onCancelSuccess
    } = deps;
    
    const handleUpdate = async (values: any) => {
        try {
            clearUpdateError();
            clearEditFormErrors();
            clearCancelError();

            const validationErrors = validateForm(values);
            if (Object.keys(validationErrors).length > 0) {
                setEditFormErrors(validationErrors);
                messageApi.error('Something went wrong. Please check the form and try again.');
                return;
            }

            setUpdating(true);

            const updateRequest: UpdateReservationRequest = {
                ...values,
                guestEmail: values.guestEmail.trim(),
                expectedArrivalDate: dayjs(values.expectedArrivalDate).toISOString(),
                expectedArrivalTime: values.expectedArrivalTime,
                tableSize: Number(values.tableSize),
                specialRequests: values.specialRequests?.trim(),
            };

            const response = await updateReservation(values.reservationId, updateRequest);

            if (response && response.status === 200) {
                messageApi.success('Done!');
                resetEditForm();
                // Call the success callback
                if (onUpdateSuccess) {
                    onUpdateSuccess();
                }
            } else {
                messageApi.error('Error');
            }
            resetEditForm();
            clearUpdateError();
        } catch (err: any) {
            const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
            setUpdateError(`Error occurred: ${errorMessage}`);
            messageApi.error('Error');
        } finally {
            setUpdating(false);
        }
    }

    const handleUpdateFailed = () => {
        messageApi.error('Please fill in all required fields correctly');
    };

    const handleCancel = async (values: any) => {
        try {
            clearEditFormErrors();
            clearUpdateError();
            clearCancelError();

            setCancelling(true);

            const cancelResponse = await cancelReservationByGuest(values.reservationId, {});

            if (cancelResponse && cancelResponse.status === 200) {
                messageApi.success('Done!');
                resetEditForm();
                // Call the success callback if provided
                if (onCancelSuccess) {
                    onCancelSuccess();
                }
            } else {
                messageApi.error('Error');
            }
            resetEditForm();
            clearCancelError();
        } catch (err: any) {
            const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
            setCancelError(`Error occurred: ${errorMessage}`);
            messageApi.error('Error');
        } finally {
            setCancelling(false);
        }
    };

    return { handleUpdate, handleUpdateFailed, handleCancel };  
};
