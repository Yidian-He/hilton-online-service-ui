import type { Reservation } from '@/model/Reservation';
import { ReservationStatus } from '@/model/Reservation';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Table, Form, Input, DatePicker, Button, Space, message, Typography, Select, Modal } from 'antd';
import { SearchOutlined, PlusOutlined, CloseSquareFilled, CheckSquareFilled, InfoCircleOutlined } from '@ant-design/icons';
import { useBoundStore } from '@/store';
import { useShallow } from 'zustand/shallow';
import { useReservationList } from '@/page/Reservation/hooks/reservationList';

const { Text } = Typography;

export const ReservationList: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [
        reservations,
        setReservations,
        currentReservation,
        setCurrentReservation,
        showContactInfoForm,
        setShowContactInfoForm,
        searching,
        setSearching,
        error,
        setError,
        clearError,
        resetForm,
    ] = useBoundStore(
        useShallow(state => [
            state.reservationList.reservations,
            state.reservationList.setReservations,
            state.reservationList.currentReservation,
            state.reservationList.setCurrentReservation,
            state.reservationList.showContactInfoForm,
            state.reservationList.setShowContactInfoForm,
            state.reservationList.searching,
            state.reservationList.setSearching,
            state.reservationList.error,
            state.reservationList.setError,
            state.reservationList.clearError,
            state.reservationList.resetForm
        ])
    );

    const statusOptions = [
        { value: ReservationStatus.REQUESTED, label: 'Requested' },
        { value: ReservationStatus.APPROVED, label: 'Approved' },
        { value: ReservationStatus.CANCELLED, label: 'Cancelled' },
        { value: ReservationStatus.COMPLETED, label: 'Completed' },
    ];

    const RESERVATION_LIST_COLUMN_CONFIG = [{
            title: 'Guest Name',
            dataIndex: 'guestName',
            key: 'guestname',
        }, {
            title: 'Arrival Date',
            dataIndex: 'expectedArrivalDate',
            key: 'expectedArrivalDate',
            width: 200,
            render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
        }, {
            title: 'Arrival Time',
            dataIndex: 'expectedArrivalTime',
            key: 'expectedArrivalTime',
            width: 150,
            sort: true,
        }, {
            title: 'Table Size',
            dataIndex: 'tableSize',
            key: 'tableSize',
            width: 150,
            sort: true,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            sort: true,
        }, {
            title: 'Special Requests',
            dataIndex: 'specialRequests',
            key: 'specialRequests',
        }, {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, currentReservation: Reservation, index: number) => {
                return (
                    <div>
                        <PlusOutlined
                            className='text-xl mr-4'
                            onClick={() => handleUpdateStatus({ 
                                _id: currentReservation._id, 
                                status: ReservationStatus.APPROVED 
                            })}
                            title="Approve"
                        />
                        <CloseSquareFilled
                            className='text-xl mr-4'
                            onClick={() => handleUpdateStatus({ 
                                _id: currentReservation._id, 
                                status: ReservationStatus.CANCELLED 
                            })}
                            title="Cancel"
                        />
                        <CheckSquareFilled
                            className='text-xl mr-4'
                            onClick={() => handleUpdateStatus({ 
                                _id: currentReservation._id, 
                                status: ReservationStatus.COMPLETED 
                            })}
                            title="Complete"
                        />
                        <InfoCircleOutlined
                            className='text-xl'
                            onClick={() => { 
                                setCurrentReservation(currentReservation);
                                setShowContactInfoForm(true) 
                            }}
                            title="View Details"
                        />
                    </div>
                );
            }
        }
    ];

    // Initial state for filters
    useEffect(() => {
        // Initialize form fields with proper types. DatePicker expects a Dayjs instance
        form.setFieldsValue({
            expectedArrivalDate: dayjs().startOf('day'),
            status: undefined,
            searchText: '',
        });
        // Trigger initial search once when the page loads
        form.submit();
    }, [form]);

    const { handleSearch, handleUpdateStatus } = useReservationList({
        form,
        messageApi,
        setSearching,
        setError,
        clearError,
        resetForm,
        setReservations
    });

    return (
        <>
            {contextHolder}
            <Modal
                title="Reservation Details"
                open={showContactInfoForm}
                onCancel={() => setShowContactInfoForm(false)}
                footer={<Button onClick={() => setShowContactInfoForm(false)}>Close</Button>}
            >
                <Space direction="vertical">
                    <Text><strong>Guest Name:</strong> {currentReservation?.guestName || ''}</Text>
                    <Text><strong>Phone:</strong> {currentReservation?.guestPhone || ''}</Text>
                    <Text><strong>Email:</strong> {currentReservation?.guestEmail || ''}</Text>
                    <Text><strong>Arrival Date:</strong> {currentReservation?.expectedArrivalDate ? dayjs(currentReservation.expectedArrivalDate).format('YYYY-MM-DD') : ''}</Text>
                    <Text><strong>Arrival Time:</strong> {currentReservation?.expectedArrivalTime || ''}</Text>
                    <Text><strong>Table Size:</strong> {currentReservation?.tableSize || ''}</Text>
                    <Text><strong>Special Requests:</strong> {currentReservation?.specialRequests || ''}</Text>
                </Space>
            </Modal>
            {/* Top Bar */}
            <Space style={{ margin: '16px 0' }} wrap>
                <Form
                    form={form}
                    layout="inline"
                    onFinish={handleSearch}
                >
                    <Form.Item name="expectedArrivalDate">
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Select date"
                            style={{ width: 200 }}
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item name="status">
                        <Select
                            placeholder="Select status"
                            style={{ width: 200 }}
                            allowClear
                            options={statusOptions}
                        />
                    </Form.Item>

                    <Form.Item name="searchText">
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Enter Phone or Reservation Code"
                            style={{ width: 300 }}
                            maxLength={20}
                            allowClear
                        />
                    </Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={searching}
                        >
                            {searching ? 'Searching' : 'Apply'}
                        </Button>
                        <Button
                            onClick={() => { 
                                form.resetFields();
                            }}
                        >
                            Reset
                        </Button>
                    </Space>
                </Form>
            </Space>
            
            <Table
                rowKey="_id"
                columns={RESERVATION_LIST_COLUMN_CONFIG}
                dataSource={reservations}
                loading={searching}
                pagination={false}
            />
        </>
    );
};

export default ReservationList;
