/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import pathToRegexp from 'path-to-regexp';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { queryArray, arrayToTree } from '../../utils';
import styles from './MainMenu.less';

const { SubMenu } = Menu;
const MainMenu = ({ siderFold, menu, location }) => {
  const menuTree = arrayToTree(menu.filter(_ => _.mpid !== -1), 'id', 'mpid');
  const renderSubMenu = (siderFold) => {
    return (
      siderFold ? <Icon className={styles.anticon} type="user" /> : <span><Icon type="user" /> 用户管理</span>
    );
  };

  const levelMap = {};

  const getMenus = (menuTreeN, siderFoldN) => {
    return menuTreeN.map((item) => {
      if (item.children) {
        if (item.mpid) {
          levelMap[item.id] = item.mpid;
        }
        return (
          <Menu.SubMenu
            key={item.id}
            title={
              <span>
                {item.icon && <Icon type={item.icon} className={siderFoldN ? styles.anticon : ''} />}
                {(!siderFoldN || menuTree.indexOf(item) < 0) && item.name}
              </span>
            }
          >
            {getMenus(item.children, siderFoldN)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id} >
          <Link to={item.router}>
            {item.icon && <Icon type={item.icon} className={(siderFoldN && !item.mpid) ? styles.anticon : ''} />}
            {(!siderFoldN || menuTree.indexOf(item) < 0) && item.name}
          </Link>
        </Menu.Item>
      );
    });
  };

  const menuItems = getMenus(menuTree, siderFold);

  // 寻找选中路由
  let currentMenu;
  let defaultSelectkeys;
  for (let item of menu) {
    if (item.router && pathToRegexp(item.router).exec(location.pathname)) {
      currentMenu = item;
      break;
    }
  }

  const getPathArray = (array, current, pid, id) => {
    let result = [String(current[id])];
    const getPath = (item) => {
      if (item && item[pid]) {
        result.unshift(String(item[pid]));
        getPath(queryArray(array, item[pid], id));
      }
    };
    getPath(current);
    return result;
  };

  if (currentMenu) {
    defaultSelectkeys = getPathArray(menu, currentMenu, 'mpid', 'id');
  }

  return (
    <Menu
      theme="dark"
      mode={siderFold ? 'vertical' : 'inline'}
      defaultSelectedKeys={defaultSelectkeys}
    >
      {menuItems}
    </Menu>
  );
};

export default MainMenu;
