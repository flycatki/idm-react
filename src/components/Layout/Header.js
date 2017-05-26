/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import { Menu } from 'antd';

import styles from './Header.less';

const Header = () => {
  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ fontSize: '14px' }}
      >
        <Menu.Item key="1">头部菜单1</Menu.Item>
        <Menu.Item key="2">头部菜单2</Menu.Item>
        <Menu.Item key="3">头部菜单3</Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
