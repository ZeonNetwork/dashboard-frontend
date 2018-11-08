import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { fetchReferrals } from '../../../redux/modules/referrals/referrals';

import Address from '../../../components/referrals/Address';
import Summary from '../Summary';
import Users from '../Users';

import config from '../../../utils/config';
import s from './styles.scss';

class Referrals extends Component {
  componentWillMount() {
    const { fetchReferrals } = this.props;

    fetchReferrals();
  }

  render() {
    const {
      t,
      refCode,
      users
    } = this.props;

    return (
      <div className={s.main}>
        <div className={s.topbar}>
          <div className={s.title}>{t('title')}</div>
        </div>
        <div className={s.children}>
          <p>{t('description')}</p>
          <p>{t('conditions')}</p>
          <p>{t('details')}</p>
        </div>
        <div className={s.address}>
          <Address address={`${config.domain}/auth/sign-up?referral=${refCode}`}/>
        </div>

        <div className={s.users}>
          {Boolean(users.length) && <Users/>}
        </div>
        <div className={s.widget}><Summary/></div>
      </div>
    );
  }
}

const TranslatedComponent = translate('referrals')(Referrals);
export default connect(
  (state) => ({
    refCode: state.referrals.referrals.refCode,
    referralCount: state.referrals.referrals.referralCount,
    users: state.referrals.referrals.users
  }),
  {
    fetchReferrals
  }
)(TranslatedComponent);
