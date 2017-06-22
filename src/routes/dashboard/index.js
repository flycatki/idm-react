/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import ContactView from '../../components/Contact/ContactView';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  animationPlay = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.contactView.onPlay();
  };

  render() {
    return (
      <div>
        <ContactView
          ref={(contactView) => { this.contactView = contactView; }}
        >
          <div>dashboard dialog</div>
        </ContactView>
        <Button onClick={e => this.animationPlay(e)}>play</Button>
      </div>
    );
  }
}

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
