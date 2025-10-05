import { Greetings } from '@/components/Greetings';
import { Layout, Menu } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Header: SiteHeader } = Layout;

const MENU_TOP_ITEMS = [
    {
        key: 'menu_top_item_1',
        label: (
            <Link to="/">
                <HomeOutlined /> <span>Hilton Online Service</span>
            </Link>
        )
    }
];

const HeaderComponent = () => {
    return (
        // https://www.tailwindcss.cn/docs/configuration#important-modifier
        <SiteHeader className='flex items-center !p-0 !bg-white'>
            <Menu
                theme='light'
                mode='horizontal'
                defaultSelectedKeys={['menu_top_item_1']}
                items={MENU_TOP_ITEMS}
                className='text-center font-semibold flex-1'
            />
            <Greetings name='Guest' />
        </SiteHeader>
    );
};

export const Header = memo(HeaderComponent);
