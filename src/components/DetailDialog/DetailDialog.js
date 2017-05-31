/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import styles from './DetailDialog.less';

const DetailDialog = ({ children, visible, onClose }) => {
  const maskStyle = {
    backgroundColor: 'rgba(55, 55, 55, 0)',
  };

  return (
    <Dialog
      maskStyle={maskStyle}
      maskClosable="true"
      visible={visible}
      onClose={onClose}
      transitionName="fade"
      className={styles.dialogRoot}
      bodyStyle={{ padding: 0 }}
    >
      {children}
    </Dialog>
  );
};

export default DetailDialog;
