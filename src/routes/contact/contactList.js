/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Table, Icon, Button } from 'antd';

import styles from './contactList.less';

const ContactList = ({ dataSource, registerContact }) => {

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

  return (
    <div className={styles.listWrapper}>
      {dataSource ?
        <Table />
        : getEmptyPrompt()
      }
    </div>
  );
};

export default ContactList;
