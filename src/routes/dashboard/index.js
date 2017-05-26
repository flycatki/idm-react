/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import { connect } from 'dva';

const Dashboard = (dashboard) => {
  return (
    <div>dashboard</div>
  );
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
