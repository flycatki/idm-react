/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';

import MainMenu from './MainMenu';
import styles from './Sider.less';

const Sider = ({ siderFold, menu, location }) => {
  const mainMenuProps = {
    menu,
    siderFold,
    location,
  };

  return (
    <div>
      <MainMenu {...mainMenuProps} />
    </div>
  );
};

export default Sider;
