import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'name',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'test',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'name',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'test',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'name',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'test',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation One',
        key: 'name',
        icon: <MailOutlined />,
    },

];

const App: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default App;
