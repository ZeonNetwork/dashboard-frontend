import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { library as fontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';
import { fetchUser, logout } from '../../../redux/modules/app/app';

import Sidebar from '../../../components/app/Sidebar';
import MakeDepositPopup from '../MakeDepositPopup';
import Dashboard from '../../dashboard/Dashboard';
import Referrals from '../../referrals/Referrals';
import Transactions from '../../transactions/Transactions';
import Settings from '../../settings/Settings';
// import Shuftipro from '../../../components/verification/Shuftipro';
import Error404 from '../../../components/common/Error404';

import * as routes from '../../../routes';
import { kycIsVerified } from '../../../utils/verification';
import s from './styles.scss';

fontAwesomeLibrary.add(faPaperPlane, faTwitter, faMediumM, faGithub);

class AppWrapper extends Component {
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const {
      kycStatus,
      logout
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.sidebar_wrapper}>
          <div className={s.sidebar}>
            <Sidebar kyc={kycIsVerified(kycStatus)} logout={logout}/>
            <ul className={s.social_networks}>
              <li><a href="https://bit.ly/ze0ntelegram"><FontAwesomeIcon icon='paper-plane' size='lg'/></a></li>
              <li><a href="https://bit.ly/ze0ntwitter"><FontAwesomeIcon icon={['fab', 'twitter']} size='lg'/></a></li>
              <li><a href="https://bit.ly/ze0nmedium2"><FontAwesomeIcon icon={['fab', 'medium-m']} size='lg'/></a></li>
              <li><a href="http://bit.ly/ze0ntrgithub"><FontAwesomeIcon icon={['fab', 'github']} size='lg'/></a></li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route exact path={routes.DASHBOARD} component={Dashboard}/>
          <Route exact path={routes.REFERRALS} component={Referrals}/>
          <Route exact path={routes.TRANSACTIONS} component={Transactions}/>
          <Route exact path={routes.SETTINGS} component={Settings}/>
          {/* <Route exact path={routes.KYC_VERIFICATION} component={Shuftipro}/> */}
          <Redirect exact from="/" to={routes.DASHBOARD}/>
          <Route component={Error404}/>
        </Switch>
        <MakeDepositPopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    fetchUser,
    logout
  }
)(AppWrapper);
