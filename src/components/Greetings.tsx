import { memo } from 'react';
import { Button } from 'antd';
import { useGreetingText } from '@/hooks/useGreetingText';


type GreetingsComponentType = {
    name: string;
};

const GreetingsComponent = ({ name }: GreetingsComponentType) => {
    const { text } = useGreetingText();
    return (
        <>
            <Button type='primary' href='/reservation-list'>
                Login As Employee
            </Button>
            <span
                // https://www.tailwindcss.cn/docs/text-color
                className='px-4 text-[#8060b6] hover:bg-[#eee6f5]'
            >
                {text}, {name}
            </span>
        </>
    );
};

export const Greetings = memo(GreetingsComponent);
