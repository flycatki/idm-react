/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Table, Icon, Button } from 'antd';
import { Link } from 'dva/router';

import styles from './contactList.less';

const ContactList = ({ registerContact, onEditItem, ...tableProps }) => {
  const handleRegisterContact = () => {
    registerContact();
  };

  const getEmptyPrompt = () => {
    return (
      <div className={styles.emptyPrompt}>
        <Icon type="contacts" style={{ fontSize: 108, color: '#d3d3d3' }} />
        <h2>您还没有创建联系人，可以点击“新建联系人”来建立！</h2>
        <p>联系人库可以用来统一管理团队的客户及外部联络资源，记录客户跟踪中的每一个联络步骤及内容</p>
        <p>让您清清楚楚联系人滚动跟踪的每一天情况</p>
        <div className={styles.addBtn}>
          <Button type="primary" onClick={handleRegisterContact}><Icon type="plus" /> 新建联系人</Button>
        </div>
      </div>
    );
  };

  const handleNameColClick = (record, e) => {
    onEditItem(record);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={e => handleNameColClick(record, e)}>{text}</a>,
    },
    {
      title: '头衔',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '移动电话',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '办公电话',
      dataIndex: 'officePhone',
      key: 'officePhone',
    },
  ];

  return (
    <div className={styles.listWrapper}>
      {tableProps.dataSource.length > 0 ?
        <div className={styles.contactTableWrapper}>
          <Table
            {...tableProps}
            className={styles.contactTable}
            simple
            rowKey={record => record.key}
            columns={columns}
          />
        </div>
        : getEmptyPrompt()
      }
    </div>
  );
};

export default ContactList;
