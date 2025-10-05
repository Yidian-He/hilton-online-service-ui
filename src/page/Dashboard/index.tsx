import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import theme from '@/config/theme.json';
import { ConfigProvider, Layout } from 'antd';
import { Outlet } from 'react-router';

const { Content } = Layout;

export const Dashboard = () => {
    return (
        <ConfigProvider theme={theme}>
            <Layout className='!min-h-screen'>
                <Layout>
                    <Header />
                    <Content className='mx-4'>
                        <Outlet />
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
