/**
 * Created by jiangyh on 17-6-20.
 */
import React from 'react';
import Tween from 'rc-tween-one';
import styles from './ContactView.less';

class ContactView extends React.Component {

  constructor(props) {
    super(props);
    this.animation = [{ translateX: '-800px', duration: 1000 }];
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    if (this.props.detailDialogVisible === true) {
      this.props.closeContactView();
    }
  }

  componentDidMount() {
    document.addEventListener('click', e => {
      this.handleClose();
    }, false);

    document.querySelector('.cview').addEventListener('click', e => {
      e.stopPropagation();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click');
    document.querySelector('.cview').removeEventListener('click');
  }

  render() {
    return (
      <Tween
        animation={[{ translateX: '-800px', duration: 1000 }]}
        paused={this.props.dialogPaused}
        reverse={this.props.dialogReverse}
        reverseDelay={this.props.dialogReverseDelay}
        moment={this.props.dialogMoment}
        className={styles.dialogRoot + ' cview'}
      >
        {this.props.children}
      </Tween>
    );
  }
}

export default ContactView;
