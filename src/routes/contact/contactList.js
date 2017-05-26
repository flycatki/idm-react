/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Table } from 'antd';

import styles from './contactList.less';

const ContactList = () => {
  return (
    <div className={styles.listWrapper}>
      <Table />
    </div>
  );
};

export default ContactList;
