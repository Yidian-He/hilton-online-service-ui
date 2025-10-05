import { ConfigProvider, Layout } from 'antd';
import { Outlet } from 'react-router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import theme from '@/config/theme.json';

const { Content } = Layout;

function App() {
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
}

export default App;
