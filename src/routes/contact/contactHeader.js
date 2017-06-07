/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Layout, Icon, Input, Row, Col, Button } from 'antd';

import styles from './contactHeader.less';

const { Header } = Layout;
const Search = Input.Search;

const ContactHeader = ({ siderFold, toggle, registerContact }) => {
  const handleRegisterContact = () => {
    registerContact();
  };

  return (
    <Header className={styles.header}>
      <Row type="flex" align="middle">
        <Col span={1}>
          <Icon
            className={styles.trigger}
            onClick={toggle}
            type={siderFold ? 'menu-unfold' : 'menu-fold'}
          />
        </Col>
        <Col span={3}>
          <Search placeholder="名称" addonAfter={<Icon type="down" />} />
        </Col>
        <Col span={2} offset={18}>
          <Button type="primary" onClick={handleRegisterContact}><Icon type="plus" /> 新建联系人</Button>
        </Col>
      </Row>
    </Header>
  );
};

export default ContactHeader;
