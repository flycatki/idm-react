/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import { Layout, Icon } from 'antd';
import { config } from '../../utils'
import IdmSider from './Sider';
import IdmHeader from './Header';

import styles from './MainLayout.less';

const { Sider, Header, Content } = Layout;
const MainLayout = ({ siderFold, children, location, dispatch, toggle, menu }) => {
  const idmSiderProps = {
    menu,
    siderFold,
    location,
  };

  return (
    <Layout>
      <Layout className={styles.siteHeader}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          {siderFold ? '' : <span>{config.name}</span>}
        </div>
      </Layout>
      <Layout>
        <Sider
          width={200}
          trigger={null}
          collapsible
          collapsed={siderFold}
        >
          <IdmSider {...idmSiderProps} />
        </Sider>
        <Layout>
          <Content style={{ background: '#f3f3f3', minHeight: 650 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
