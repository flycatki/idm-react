/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Row, Col, Button, Select } from 'antd';
import DetailDialog from '../../components/DetailDialog/DetailDialog';

import styles from './contactDetail.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const ContactDetail = ({
  item = {},
  closeDetail,
  detailContentVisible,
  switchDetailContent,
  form: {
    getFieldDecorator,
    getFieldValue,
  },
}) => {
  const handleClose = () => {
    closeDetail();
  };

  const handleOk = () => {
    const name = getFieldValue('name');
    if (name) {
      switchDetailContent(true);
    } else {
      switchDetailContent(false);
    }
  };

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  return (
    <DetailDialog
      visible="true"
      onClose={handleClose}
    >
      <Form>
        <div className={styles.detailHeader}>
          <span><Icon type="contacts" style={{ fontSize: 22 }} /> 联系人</span>
        </div>
        <div className={styles.detailSummary}>
          <FormItem {...formItemLayout} className={styles.formSummaryStyle}>
            {getFieldDecorator('name', {
              initialValue: item.name,
            })(
              <Input
                addonBefore={<Icon type="contacts" style={{ fontSize: 18 }} />}
                placeholder="请输入联系人名称"
                onPressEnter={handleOk}
              />,
            )}
          </FormItem>
        </div>
        { detailContentVisible ?
          <Row className={styles.detailContent} style={{ marginLeft: 18, marginRight: 18 }}>
            <FormItem {...formItemLayout} className={styles.formItemStyle} label="头衔">
              {getFieldDecorator('title', {
                initialValue: item.title,
              })(
                <Input size="default" className={styles.formInputStyle} />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} className={styles.formItemStyle} label="账号">
              {getFieldDecorator('account', {
                initialValue: item.account,
              })(
                <Input size="default" className={styles.formInputStyle} />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} className={styles.formItemStyle} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: item.email,
              })(
                <Input size="default" className={styles.formInputStyle} />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} className={styles.formItemStyle} label="手机">
              <div>
                <InputGroup>
                  <Col span="6">
                    <Select defaultValue="bangong">
                      <Option value="bangong">办公电话</Option>
                      <Option value="zhuzai">住宅电话</Option>
                    </Select>
                  </Col>
                  <Col span="12">
                    {getFieldDecorator('phone', {
                      initialValue: item.phone,
                    })(
                      <Input size="default" className={styles.formInputStyle} />,
                    )}
                  </Col>
                </InputGroup>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} className={styles.formItemStyle} label="密码">
              <Button type="primary" icon="edit" size="small" >重置密码</Button>
            </FormItem>
          </Row>
          : null
        }
      </Form>
    </DetailDialog>
  );
};

export default Form.create()(ContactDetail);
