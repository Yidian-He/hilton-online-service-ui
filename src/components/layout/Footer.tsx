import { Layout } from 'antd';
import { memo } from 'react';

const { Footer: SiteFooter } = Layout;

const FooterComponent = () => (
    <SiteFooter className='text-center !text-xs'>
        Yidian He &copy;{new Date().getFullYear()}
    </SiteFooter>
);

export const Footer = memo(FooterComponent);
