import { theme } from 'antd';
import { memo } from 'react';
import type { ReactNode } from 'react';

type MainContentBGWrapperComponentType = {
    children: ReactNode;
};

const MainContentBGWrapperComponent = ({
    children,
}: MainContentBGWrapperComponentType) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div
            style={{
                padding: 24,
                minHeight: 360,
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {children}
        </div>
    );
};

export const MainContentBGWrapper = memo(MainContentBGWrapperComponent);
