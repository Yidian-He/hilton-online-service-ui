import React, { useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Card, Space, message, Row, Col, Typography, Select } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined,TeamOutlined } from '@ant-design/icons';
import { useBoundStore } from '@/store';
import { useShallow } from 'zustand/shallow';
import dayjs from 'dayjs';
import { useCreateReservation } from '@/page/Reservation/hooks/createReservation';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const MakeReservationForm: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [
        reservationForm,
        setReservationForm,
        resetReservationForm,
        isCreating,
        setIsCreating,
        error,
        setError,
        clearError,
        formErrors,
        setFormErrors,
        clearFormErrors,
        addReservation,
        setCreatedReservation,
        setShowSuccessReservation,
        setShowMakeReservationForm
    ] = useBoundStore(
        useShallow(state => [
            state.reservation.reservationForm,
            state.reservation.setReservationForm,
            state.reservation.resetReservationForm,
            state.reservation.isCreating,
            state.reservation.setIsCreating,
            state.reservation.error,
            state.reservation.setError,
            state.reservation.clearError,
            state.reservation.formErrors,
            state.reservation.setFormErrors,
            state.reservation.clearFormErrors,
            state.reservation.addReservation,
            state.reservation.setCreatedReservation,
            state.reservation.setShowSuccessReservation,
            state.reservation.setShowMakeReservationForm
        ])
    );

    // Initialize form with store values
    useEffect(() => {
        form.setFieldsValue(reservationForm);
    }, [form, reservationForm]);

    // Handle form field changes
    const handleFormChange = (changedFields: any, allFields: any) => {
        const formData = form.getFieldsValue();
        setReservationForm(formData);
        
        // Clear specific field errors when user starts typing
        if (changedFields.length > 0) {
            const fieldName = changedFields[0].name[0];
            if (formErrors[fieldName]) {
                const newErrors = { ...formErrors };
                delete newErrors[fieldName];
                setFormErrors(newErrors);
            }
        }
    };

    const { handleSubmit, handleSubmitFailed } = useCreateReservation({
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
    });

    return (
        <>
            {contextHolder}
            <Card 
                title={
                    <Title level={3} style={{ margin: 0 }}>
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        Make a Reservation
                    </Title>
                }
                style={{ maxWidth: 800, margin: '0 auto' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    onFinishFailed={handleSubmitFailed}
                    onFieldsChange={handleFormChange}
                    size="large"
                >
                    <Button
                            type="primary"
                            htmlType="button"
                            style={{ marginBottom: 16 }}
                            href="/update-reservation"
                    >
                        I already have a reservation →
                    </Button>

                    <Form.Item
                        label="Full Name"
                        name="guestName"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                        validateStatus={formErrors.guestName ? 'error' : ''}
                        help={formErrors.guestName}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Full name"
                            maxLength={100}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="guestPhone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                        validateStatus={formErrors.guestPhone ? 'error' : ''}
                        help={formErrors.guestPhone}
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

                    <Form.Item
                        label="Email Address"
                        name="guestEmail"
                        rules={[
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                        validateStatus={formErrors.guestEmail ? 'error' : ''}
                        help={formErrors.guestEmail}
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
                        rules={[{ required: true, message: 'Please select table size' }]}
                        validateStatus={formErrors.tableSize ? 'error' : ''}
                        help={formErrors.tableSize}
                    >
                        <InputNumber
                            prefix={<TeamOutlined />}
                            placeholder="Number of guests"
                            min={1}
                            max={20}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <Form.Item
                                label="Arrival Date"
                                name="expectedArrivalDate"
                                rules={[{ required: true, message: 'Please select date' }]}
                                validateStatus={formErrors.expectedArrivalDate ? 'error' : ''}
                                help={formErrors.expectedArrivalDate}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    placeholder="Select arrival date"
                                    style={{ width: '100%' }}
                                    disabledDate={(current) => {
                                        return current && (current <= dayjs().startOf('day') || current > dayjs().add(30, 'day').endOf('day'));
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>  
                            <Form.Item
                                label="Arrival Time"
                                name="expectedArrivalTime"
                                rules={[{ required: true, message: 'Please select arrival time' }]}
                                validateStatus={formErrors.expectedArrivalTime ? 'error' : ''}
                                help={formErrors.expectedArrivalTime}
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
                            placeholder="Any special requests or dietary requirements..."
                            rows={3}
                            maxLength={100}
                            showCount
                        />
                    </Form.Item>

                    {error && (
                        <div style={{ marginBottom: 16 }}>
                            <Text type="danger">{error}</Text>
                        </div>
                    )}

                    <Form.Item>
                        <Space size="middle">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isCreating}
                                size="large"
                                icon={<ClockCircleOutlined />}
                            >
                                {isCreating ? 'Processing...' : 'Reserve Now'}
                            </Button>
                            
                            <Button
                                type="default"
                                onClick={() => {
                                    form.resetFields();
                                    resetReservationForm();
                                    clearFormErrors();
                                    clearError();
                                }}
                                size="large"
                                disabled={isCreating}
                            >
                                Reset Form
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
};

export default MakeReservationForm;
