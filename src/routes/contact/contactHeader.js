/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Layout, Icon, Input, Row, Col, Button, Form, Tooltip } from 'antd';

import styles from './contactHeader.less';

const Search = Input.Search;
const FormItem = Form.Item;

const ContactHeader = ({
  siderFold,
  toggle,
  registerContact,
  advanceSearchVisible,
  onFilterChange,
  switchAdvance,
  form: {
    getFieldDecorator,
    getFieldValue,
    getFieldsValue,
  },
}) => {
  const handleRegisterContact = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    registerContact();
  };

  const handleSwitchAdvance = () => {
    switchAdvance();
  };

  const handleSimpleSearch = (value) => {
    const fields = { name: value };
    onFilterChange(fields);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Layout className={styles.header}>
      <Row type="flex" align="middle" className={styles.simpleSearch}>
        <Col span={1}>
          <Icon
            className={styles.trigger}
            onClick={toggle}
            type={siderFold ? 'menu-unfold' : 'menu-fold'}
          />
        </Col>
        <Col span={3}>
          <Search
            placeholder="名称"
            onSearch={handleSimpleSearch}
            addonAfter={<Icon onClick={handleSwitchAdvance} type={advanceSearchVisible ? 'up' : 'down'} className={styles.searchIcon} />}
          />
        </Col>
        <Col span={3} offset={17} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handleRegisterContact}><Icon type="plus" /> 新建联系人</Button>
          <Tooltip placement="left" title="点击跳转帮助页面" >
            <Button type="primary" shape="circle" icon="question" size="small" style={{ marginLeft: 10 }} />
          </Tooltip>
        </Col>
      </Row>
      {advanceSearchVisible ?
        <Row className={styles.advanceSearchWrapper}>
          <Row className={styles.advanceSearch}>
            <Col span={6}>
              <FormItem {...formItemLayout} className={styles.formItemStyle} label="标题">
                {getFieldDecorator('title', {
                  initialValue: '',
                })(
                  <Input size="default" className={styles.formInputStyle} />,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} className={styles.formItemStyle} label="标题">
                {getFieldDecorator('title', {
                  initialValue: '',
                })(
                  <Input size="default" className={styles.formInputStyle} />,
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} className={styles.formItemStyle} label="标题">
                {getFieldDecorator('title', {
                  initialValue: '',
                })(
                  <Input size="default" className={styles.formInputStyle} />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row className={styles.advanceSearchBtnWrapper}>
            <Col span={4} offset={1}>
              <Button type="primary" icon="search" className={styles.advanceSearchBtn}>搜索</Button>
              <Button type="primary" icon="save" className={styles.advanceSearchBtn}>另存为常用</Button>
            </Col>
          </Row>
        </Row>
        : null
      }
    </Layout>
  );
};

export default Form.create()(ContactHeader);
