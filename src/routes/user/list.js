/**
 * Created by jiangyh on 17-5-19.
 */
import React from 'react';
import { Table } from 'antd';

const List = ({ location, ...tableProps }) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      render: text => <img alt={'avatar'} width={24} src={text} />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => <span>{text ? '男' : '女'}</span>,
    },
    {
      title: '移动电话',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];
  return (
    <div>
      <Table
        {...tableProps}
        simple
        columns={columns}
        rowkey={record => record.id}
      />
    </div>
  );
};

export default List;
