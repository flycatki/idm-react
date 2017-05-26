/**
 * Created by jiangyh on 17-5-24.
 */
import React from 'react';
import { Icon, Input, Form, Row, Col, Button } from 'antd';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import styles from './userDetail.less';

const FormItem = Form.Item;

const UserDetail = ({
  item = {},
  detailDialogVisible,
  detailContentVisible,
  detailContentType,
  closeDetail,
  switchDetailContent,
  form: {
    getFieldDecorator,
    resetFields,
    getFieldValue,
  },
}) => {
  const maskStyle = {
    backgroundColor: 'rgba(55, 55, 55, 0)',
  };

  const handleClose = () => {
    closeDetail();
  };

  const handleSummaryEnter = () => {
    const summary = getFieldValue('summary');
    if (summary) {
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
    <Dialog
      maskStyle={maskStyle}
      maskClosable="true"
      visible={detailDialogVisible}
      onClose={handleClose}
      transitionName="fade"
      className={styles.dialogRoot}
      bodyStyle={{ padding: 0 }}
    >
      <div>
        <Form>
          <div className={styles.detailHeader}>
            <span><Icon type="user" style={{ fontSize: 18 }} /> 用户</span>
          </div>
          <div className={styles.detailSummary}>
            <FormItem {...formItemLayout} className={styles.formSummaryStyle}>
              {getFieldDecorator('summary', {
                initialValue: item.summary,
              })(
                <Input
                  addonBefore={<Icon type="user" style={{ fontSize: 18 }} />}
                  placeholder="请输入用户名称"
                  onPressEnter={handleSummaryEnter}
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
                {getFieldDecorator('phone', {
                  initialValue: item.phone,
                })(
                  <Input size="default" className={styles.formInputStyle} />,
                )}
              </FormItem>
              <FormItem {...formItemLayout} className={styles.formItemStyle} label="密码">
                <Button type="primary" icon="edit" size="small" >重置密码</Button>
              </FormItem>
            </Row>
            : null
          }
        </Form>
      </div>
    </Dialog>
  );
};

export default Form.create()(UserDetail);
