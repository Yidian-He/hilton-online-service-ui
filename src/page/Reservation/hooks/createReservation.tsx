import dayjs from 'dayjs';
import { createReservation, type CreateReservationRequest } from '@/api/Reservation/service';
import { AxiosError } from 'axios';

type Deps = {
  form: any;
  messageApi: any;
  addReservation: (reservation: any) => void;
  setIsCreating: (isCreating: boolean) => void;
  setError: (msg: string) => void;
  clearError: () => void;
  setFormErrors: (errors: Record<string, string>) => void;
  clearFormErrors: () => void;
  resetReservationForm: () => void;
  setCreatedReservation: (reservation: any) => void;
  setShowSuccessReservation: (show: boolean) => void;
  setShowMakeReservationForm: (show: boolean) => void;
};

const validateForm = (values: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.guestName?.trim()) {
    errors.guestName = 'Guest name is required';
  }
  
  if (!values.guestPhone?.trim()) {
    errors.guestPhone = 'Phone number is required';
  } else if (!/^1[3-9]\d{9}$/.test(values.guestPhone.replace(/\D/g, ''))) {
    errors.guestPhone = 'Please enter a valid phone number';
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

  if (!values.tableSize || values.tableSize < 1) {
    errors.tableSize = 'Table size must be at least 1';
  } else if (values.tableSize > 20) {
    errors.tableSize = 'Table size cannot exceed 20 people';
  }

  if (!values.expectedArrivalTime) {
    errors.expectedArrivalTime = 'Please select arrival time';
  }

  return errors;
};

export const useCreateReservation = (deps: Deps) => {
  const {
    form,
    messageApi,
    addReservation,
    setIsCreating,
    setError,
    clearError,
    setFormErrors,
    clearFormErrors,
    resetReservationForm,
    setCreatedReservation,
    setShowSuccessReservation,
    setShowMakeReservationForm,
  } = deps;

  const handleSubmit = async (values: any) => {
    try {
      clearError();
      clearFormErrors();

      const validationErrors = validateForm(values);
      if (Object.keys(validationErrors).length > 0) {
        setFormErrors(validationErrors);
        messageApi.error('Something went wrong. Please check the form and try again.');
        return;
      }

      setIsCreating(true);

      const requestData: CreateReservationRequest = {
        guestName: values.guestName.trim(),
        guestPhone: values.guestPhone.trim(),
        guestEmail: values.guestEmail.trim(),
        expectedArrivalDate: new Date(dayjs(values.expectedArrivalDate).toISOString()),
        expectedArrivalTime: values.expectedArrivalTime,
        tableSize: values.tableSize,
        specialRequests: values.specialRequests?.trim() || '',
      };

      const response = await createReservation(requestData);

      // On success, update state and notify user
      if (response && response.status == 201) {
        // Store the created reservation and show success component
        setCreatedReservation(response.data);
        setShowSuccessReservation(true);
        setShowMakeReservationForm(false);
        
        // Add to reservations list
        addReservation(response);
        
        // Reset form
        messageApi.success('Done!');
        form.resetFields();
        resetReservationForm();
      } else {
        messageApi.error('Error occurred. Please try again.');
      }
    } catch (err: any) {
      const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
      setError(`Error occurred: ${errorMessage}`);
      messageApi.error('Error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSubmitFailed = (_errorInfo: any) => {
    messageApi.error('Please fill in all required fields correctly');
  };

  return { handleSubmit, handleSubmitFailed };
};
