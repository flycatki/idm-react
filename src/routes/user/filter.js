/**
 * Created by jiangyh on 17-5-19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, InputNumber, Radio, Select, Button, Icon } from 'antd';
import styles from './filter.less';

const Search = Input.Search;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const ColPropsAdva = {
  xs: 24,
  sm: 12,
  style: {
    marginTop: 16,
    marginBottom: 16,
  },
};

const Filter = ({
  advanceSearchOpen,
  switchAdvance,
  registerUser,
  filter,
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const FormItem = Form.Item;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select className={styles.icpSelector}>
      <Option value="86">+86</Option>
    </Select>,
  );

  const handleFields = (fields) => {
    const { createTime } = fields;
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')];
    }
    return fields;
  };

  const handleSearch = () => {
    let fields = getFieldsValue();
    //fields = handleFields(fields);
    onFilterChange(fields);
  };

  const handleRegistClick = () => {
    registerUser();
  };

  const { name } = filter;

  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between" align="middle">
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
          <Button className="editable-add-btn" onClick={handleRegistClick} >注册</Button>
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }} offset={14}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search placeholder="请输入姓名" onSearch={handleSearch} />,
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 2 }} md={{ span: 2 }}>
          <a style={{ fontSize: 12 }} onClick={switchAdvance}>高级搜索 <Icon type={'down'} /></a>
        </Col>
      </Row>
      {advanceSearchOpen ?
        <div className={styles.advance} >
          <Row gutter={24} style={{ marginLeft: 0, marginRight: 0 }}>
            <Col xl={{ span: 4 }} md={{ span: 6 }}>
              <FormItem {...formItemLayout} label="年龄">
                {getFieldDecorator('age')(
                  <InputNumber min={1} max={200} />,
                )}
              </FormItem>
            </Col>
            <Col xl={{ span: 4 }} md={{ span: 6 }}>
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('isMale')(
                  <RadioGroup >
                    <RadioButton value="true">男</RadioButton>
                    <RadioButton value="false">女</RadioButton>
                  </RadioGroup>,
                )}
              </FormItem>
            </Col>
            <Col xl={{ span: 4 }} md={{ span: 8 }}>
              <FormItem {...formItemLayout} label="电话">
                {getFieldDecorator('phone')(
                  <Input placeholder="请输入电话" addonBefore={prefixSelector} />,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} >清空</Button>
            </Col>
          </Row>
        </div>
        : null
      }
    </div>
  );
};

Filter.propTypes = {
  advanceSearchOpen: PropTypes.bool,
  switchAdvance: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  form: PropTypes.object,
};

export default Form.create()(Filter);
