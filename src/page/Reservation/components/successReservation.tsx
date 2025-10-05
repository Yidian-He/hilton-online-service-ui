import React from 'react';
import { 
    Alert, 
    Card, 
    Typography, 
    Space, 
    Button
} from 'antd';
import { 
    CheckCircleOutlined, 
    CopyOutlined, 
    CalendarOutlined,
} from '@ant-design/icons';
import type { Reservation } from '@/model/Reservation';

const { Title, Text, Paragraph } = Typography;

interface SuccessReservationProps {
    reservation: Reservation;
    onCreateAnother?: () => void;
    onFindReservation?: () => void;
}

export const SuccessReservation: React.FC<SuccessReservationProps> = ({
    reservation,
    onCreateAnother,
    onFindReservation
}) => {
    const handleCopyReservationCode = () => {
        navigator.clipboard.writeText(reservation.reservationCode);
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <Alert
                message="Done!"
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginBottom: 24 }}
            />

            {/* Reservation Code Section */}
            <Card
                title={
                    <Space direction="vertical">
                        <Title level={4} style={{ margin: 0 }}>
                            Please copy your Reservation Code
                        </Title>
                    </Space>
                }
                style={{ marginBottom: 24 }}
            >
                <div style={{ 
                    background: '#f6ffed', 
                    border: '1px solid #b7eb8f', 
                    borderRadius: '8px', 
                    padding: '16px', 
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ margin: '8px 0' }}>
                        <Text 
                            strong 
                            style={{ 
                                fontSize: '24px', 
                                fontFamily: 'monospace',
                                letterSpacing: '2px'
                            }}
                        >
                            {reservation.reservationCode}
                        </Text>
                    </div>
                    <Button 
                        type="link" 
                        icon={<CopyOutlined />}
                        onClick={handleCopyReservationCode}
                        size="small"
                    >
                        Copy Code
                    </Button>
                </div>
            </Card>

            {/* Action Buttons */}
            <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={5}>What's Next?</Title>
                    <Paragraph type="secondary">
                        Please arrive 15 minutes before your reservation time. 
                        If you need to update or cancel, please go to find your reservation by reservation code or phone number.
                    </Paragraph>
                    
                    <Space size="middle" wrap>
                        {onCreateAnother && (
                            <Button 
                                type="primary" 
                                onClick={onCreateAnother}
                                icon={<CalendarOutlined />}
                            >
                                Make Another Reservation
                            </Button>
                        )}
                        
                        {onFindReservation && (
                            <Button 
                                type="default" 
                                onClick={onFindReservation}
                            >
                                Find My Reservation
                            </Button>
                        )}
                    </Space>
                </Space>
            </Card>
        </div>
    );
};

export default SuccessReservation;
