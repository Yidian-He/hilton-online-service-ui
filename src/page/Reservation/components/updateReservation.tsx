import React, { useEffect } from 'react';
import { Button, Input, Form, Row, Col,DatePicker, Select, InputNumber, message, Card, Space, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined, SearchOutlined, SaveOutlined, CloseOutlined, CalendarOutlined } from '@ant-design/icons';
import { useBoundStore } from '@/store';
import { useShallow } from 'zustand/shallow';
import dayjs from 'dayjs';
import { ReservationStatus } from '@/model/Reservation';
import { useFindActiveReservationByGuest } from '@/page/Reservation/hooks/findActiveReservationByGuest';
import { useUpdateReservation } from '@/page/Reservation/hooks/updateReservation';

const { Text } = Typography;
const { TextArea } = Input;

export const UpdateReservation: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    
    const [
        searchForm,
        setSearchForm,
        resetSearchForm,
        loading,
        setLoading,
        searchFormErrors,
        setSearchFormErrors,
        clearSearchFormErrors,
        searchError,
        setSearchError,
        clearSearchError,
        foundReservation,
        setFoundReservation
    ] = useBoundStore(
        useShallow(state => [
            state.findActiveReservationByGuest.searchForm,
            state.findActiveReservationByGuest.setSearchForm,
            state.findActiveReservationByGuest.resetSearchForm,
            state.findActiveReservationByGuest.loading,
            state.findActiveReservationByGuest.setLoading,
            state.findActiveReservationByGuest.searchFormErrors,
            state.findActiveReservationByGuest.setSearchFormErrors,
            state.findActiveReservationByGuest.clearSearchFormErrors,
            state.findActiveReservationByGuest.searchError,
            state.findActiveReservationByGuest.setSearchError,
            state.findActiveReservationByGuest.clearSearchError,
            state.findActiveReservationByGuest.foundReservation,
            state.findActiveReservationByGuest.setFoundReservation
        ])
    );

    //Handle search form field changes
    const handleSearchFormChange = (changedFields: any, allFields: any) => {
        const formData = form.getFieldsValue();
        setSearchForm(formData);
        
        // Clear specific field errors when user starts typing
        if (changedFields.length > 0) {
            const fieldName = changedFields[0].name[0];
            if (searchFormErrors[fieldName]) {
                const newErrors = { ...searchFormErrors };
                delete newErrors[fieldName];
                setSearchFormErrors(newErrors);
            }
        }
    };

    // Handle search form submission
    const { handleSearch, handleSearchFailed } = useFindActiveReservationByGuest({
        form: searchForm,
        messageApi,
        setLoading,
        setSearchError,
        clearSearchError,
        setSearchFormErrors,
        clearSearchFormErrors,
        resetSearchForm,
        setFoundReservation
    });

    const [
        editForm,
        setEditForm,
        resetEditForm,
        updating,
        setUpdating,
        editFormErrors,
        setEditFormErrors,
        clearEditFormErrors,
        updateError,
        setUpdateError,
        clearUpdateError,
        cancelError,
        setCancelError,
        clearCancelError,
        cancelling,
        setCancelling,
    ] = useBoundStore(
        useShallow(state => [
            state.updateReservation.editForm,
            state.updateReservation.setEditForm,
            state.updateReservation.resetEditForm,
            state.updateReservation.updating,
            state.updateReservation.setUpdating,
            state.updateReservation.editFormErrors,
            state.updateReservation.setEditFormErrors,
            state.updateReservation.clearEditFormErrors,
            state.updateReservation.updateError,
            state.updateReservation.setUpdateError,
            state.updateReservation.clearUpdateError,
            state.cancelReservation.cancelError,
            state.cancelReservation.setCancelError,
            state.cancelReservation.clearCancelError,
            state.cancelReservation.cancelling,
            state.cancelReservation.setCancelling,
        ])
    );

    // Initialize edit form with foundReservation data
    useEffect(() => {
        if (foundReservation) {
            form.setFieldsValue({
                reservationId: foundReservation._id,
                guestName: foundReservation.guestName,
                guestEmail: foundReservation.guestEmail,
                guestPhone: foundReservation.guestPhone,
                tableSize: foundReservation.tableSize,
                expectedArrivalDate: foundReservation.expectedArrivalDate ? dayjs(foundReservation.expectedArrivalDate) : null,
                expectedArrivalTime: foundReservation.expectedArrivalTime,
                specialRequests: foundReservation.specialRequests
            });
        }
    }, [foundReservation, form]);

    // Handle edit form field changes
    const handleEditFormChange = (changedFields: any, allFields: any) => {
        const formData = form.getFieldsValue();
        setEditForm(formData);
        
        // Clear specific field errors when user starts typing
        if (changedFields.length > 0) {
            const fieldName = changedFields[0].name[0];
            if (editFormErrors[fieldName]) {
                const newErrors = { ...editFormErrors };
                delete newErrors[fieldName];
                setEditFormErrors(newErrors);
            }
        }
    };

    // Reset all data
    const handleBackToSearch = () => {
        setFoundReservation(null);
        resetEditForm();
        clearEditFormErrors();
        clearUpdateError();
        resetSearchForm();
        clearSearchFormErrors();
        clearSearchError();
        clearCancelError();
        form.resetFields();
    };

    // Handle button clicks
    const { handleUpdate, handleUpdateFailed, handleCancel } = useUpdateReservation({
        form: editForm,
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
        onUpdateSuccess: handleBackToSearch,
        onCancelSuccess: handleBackToSearch
    });

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {contextHolder}

            {!foundReservation ? (
                // Search Form
                <Card title="Search Reservation" style={{ marginBottom: 24 }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSearch}
                        onFinishFailed={handleSearchFailed}
                        onFieldsChange={handleSearchFormChange}
                    >
                        <Form.Item
                            label="Arrival Date"
                            name="expectedArrivalDate"
                            rules={[{ required: true, message: 'Please select' }]}
                            validateStatus={searchFormErrors.expectedArrivalDate ? 'error' : ''}
                            help={searchFormErrors.expectedArrivalDate}
                        >
                            <DatePicker 
                                style={{ width: '100%' }}
                                format="YYYY-MM-DD"
                                placeholder="Select arrival date"
                                disabledDate={(current) => {
                                    return current && (current < dayjs().startOf('day'));
                                }}
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Phone Number"
                                    name="guestPhone"
                                    validateStatus={searchFormErrors.guestPhone ? 'error' : ''}
                                    help={searchFormErrors.guestPhone}
                                >
                                    <Input 
                                        prefix={<PhoneOutlined />}
                                        placeholder="Phone number"
                                        maxLength={11}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Reservation Code (6 characters)"
                                    name="reservationCode"                    
                                >
                                    <Input 
                                        placeholder="Enter reservation code"
                                        maxLength={6}
                                        onKeyUpCapture={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.toUpperCase();
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {searchError && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="danger">{searchError}</Text>
                            </div>
                        )}

                        <Form.Item>
                            <Space size="middle">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    icon={<SearchOutlined />}
                                    loading={loading}
                                    style={{ marginTop: 16 }}
                                >
                                    Search Reservation
                                </Button>

                                <Button 
                                    type="default" 
                                    icon={<CalendarOutlined />}
                                    style={{ marginTop: 16 }}
                                    href="/"
                                >
                                    Make a Reservation
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            ) : (
                // Edit Form
                (foundReservation.status === ReservationStatus.APPROVED) ? (
                    <>
                        <Card title="Reservation Details" style={{ marginBottom: 24 }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text><strong>Name:</strong> {foundReservation?.guestName || 'N/A'}</Text>
                                <Text><strong>Phone:</strong> {foundReservation?.guestPhone || 'N/A'}</Text>
                                <Text><strong>Email:</strong> {foundReservation?.guestEmail || 'N/A'}</Text>
                                <Text><strong>Table Size:</strong> {foundReservation?.tableSize || 'N/A'}</Text>
                                <Text><strong>Arrival Date:</strong> {foundReservation?.expectedArrivalDate ? dayjs(foundReservation?.expectedArrivalDate).format('YYYY-MM-DD') : 'N/A'}</Text>
                                <Text><strong>Arrival Time:</strong> {foundReservation?.expectedArrivalTime || 'N/A'}</Text>
                                <Text><strong>Special Requests:</strong> {foundReservation?.specialRequests || 'N/A'}</Text>
                                <Text><strong>Reservation Code:</strong> {foundReservation?.reservationCode || 'N/A'}</Text>
                                <Text><strong>Status:</strong> {foundReservation?.status || 'N/A'}</Text>
                            </Space>
                        </Card>
                        
                        <Card title="" style={{ marginBottom: 24 }}>

                            {cancelError && (
                                <div style={{ marginBottom: 16 }}>
                                    <Text type="danger">{cancelError}</Text>
                                </div>
                            )}

                            <Form.Item>
                                <Space>
                                    <Button 
                                        type="primary"
                                        icon={<CloseOutlined />}
                                        loading={cancelling}
                                        onClick={() => handleCancel({ reservationId: foundReservation?._id })}
                                    >
                                        Cancel Reservation
                                    </Button>

                                    <Button onClick={handleBackToSearch}>
                                        Back to Search
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Card>
                    </>
                ) : (
                    <>
                        <Card title="Reservation Details" style={{ marginBottom: 24 }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Text><strong>Name:</strong> {foundReservation?.guestName || 'N/A'}</Text>
                                <Text><strong>Phone:</strong> {foundReservation?.guestPhone || 'N/A'}</Text>
                                <Text><strong>Reservation Code:</strong> {foundReservation?.reservationCode || 'N/A'}</Text>
                                <Text><strong>Status:</strong> {foundReservation?.status || 'N/A'}</Text>
                            </Space>
                        </Card>

                        <Card title="Edit Reservation" style={{ marginBottom: 24 }}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleUpdate}
                                onFinishFailed={handleUpdateFailed}
                                onValuesChange={handleEditFormChange}
                            >
                                <Form.Item
                                    label="Reservation ID"
                                    name="reservationId"
                                    hidden
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Full Name"
                                    name="guestName"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                    validateStatus={editFormErrors.guestName ? 'error' : ''}
                                    help={editFormErrors.guestName}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Full name"
                                        maxLength={100}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Email Address"
                                    name="guestEmail"
                                    rules={[
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                    validateStatus={editFormErrors.guestEmail ? 'error' : ''}
                                    help={editFormErrors.guestEmail}    
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Email address"
                                        maxLength={100}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Table Size"
                                    name="tableSize"
                                    rules={[{ required: true, message: 'Please enter table size' }]}
                                    validateStatus={editFormErrors.tableSize ? 'error' : ''}
                                    help={editFormErrors.tableSize}
                                >
                                    <InputNumber 
                                        prefix={<TeamOutlined />}
                                        min={1} 
                                        max={20} 
                                        style={{ width: '100%' }}
                                        placeholder="Number of guests"
                                    />
                                </Form.Item>

                                <Row gutter={[8, 8]}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Expected Arrival Date"
                                            name="expectedArrivalDate"
                                            rules={[{ required: true, message: 'Please select arrival date' }]}
                                        >
                                            <DatePicker 
                                                style={{ width: '100%' }} 
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Arrival Time"
                                            name="expectedArrivalTime"
                                            rules={[{ required: true, message: 'Please select arrival time' }]}
                                            validateStatus={editFormErrors.expectedArrivalTime ? 'error' : ''}
                                            help={editFormErrors.expectedArrivalTime}
                                        >
                                            <Select
                                                placeholder="Select arrival time"
                                                style={{ width: '100%' }}
                                                options={[
                                                    { value: 'lunch', label: 'Lunch' },
                                                    { value: 'dinner', label: 'Dinner'}
                                                ]}
                                            />
                                        </Form.Item> 
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Special Requests"
                                    name="specialRequests"
                                >
                                    <TextArea 
                                        rows={3} 
                                        placeholder="Any special requests or dietary requirements"
                                        maxLength={100}
                                        showCount
                                    />
                                </Form.Item>

                                {updateError && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="danger">{updateError}</Text>
                                    </div>
                                )}

                                {cancelError && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="danger">{cancelError}</Text>
                                    </div>
                                )}

                                <Form.Item>
                                    <Space>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            icon={<SaveOutlined />}
                                            loading={updating}
                                        >
                                            Update Reservation
                                        </Button>

                                        <Button 
                                            type="primary"
                                            icon={<CloseOutlined />}
                                            loading={cancelling}
                                            onClick={() => handleCancel({ reservationId: foundReservation?._id })}
                                        >
                                            Cancel Reservation
                                        </Button>

                                        <Button onClick={handleBackToSearch}>
                                            Back to Search
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </>
                )
            )}
        </div>
    );
};
