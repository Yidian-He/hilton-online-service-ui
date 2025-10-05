import { graphql, queryString, type GraphqlRequest, updateReservationStatus } from '@/api/Reservation/service';
import type { Reservation } from '@/model/Reservation';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

type Deps = {
  form: any;
  messageApi: any;
  setSearching: (searching: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
  resetForm: () => void;
  setReservations: (reservations: Reservation[]) => void;
}

export const useReservationList = (desp: Deps) => {
  const {
    form,
    messageApi,
    setSearching,
    setError,
    clearError,
    resetForm,
    setReservations,
  } = desp;

  const handleSearch = async (values: any) => {
    try {
      clearError();
      setSearching(true);

      const graphqlRequest: GraphqlRequest = {
        query: queryString,
        variables: {
          date: values.expectedArrivalDate ? dayjs(values.expectedArrivalDate).toISOString() : '',
          status: values.status,
          searchText: values.searchText,
          page: values.page || 1,
          limit: values.limit || 0,
          sortBy: values.sortBy || '',
          sortOrder: values.sortOrder || '',
        },
      };

      const response = await graphql(graphqlRequest);
      const reservations = response?.data || [];

      if (response && response.status === 200) {
        setReservations(reservations.data || []);
      } else {
        messageApi.error('Error');
      }
      clearError();
    } catch (err: any) {
      const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
      setError(`Error occurred: ${errorMessage}`);
      messageApi.error('Error');
    } finally {
      setSearching(false);
    }
  }

  const handleUpdateStatus = async (values: { _id: string, status: string }) => {
    try {
      clearError();

      const response = await updateReservationStatus(values._id, { status: values.status });

      if (response && response.status === 200) {
        messageApi.success('Done');
      } else {
        messageApi.error('Error');
      }
      // Reload after success update
      form.submit();
    } catch (err: any) {
      const errorMessage = err instanceof AxiosError ? err.response?.data?.message || err.message : 'An unexpected error occurred';
      setError(`Error occurred: ${errorMessage}`);
      messageApi.error(`${errorMessage}`);
    } finally {

    }
  }

  return {handleSearch, handleUpdateStatus};

};
