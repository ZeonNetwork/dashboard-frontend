import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { fetchDashboard } from '../../../redux/modules/dashboard/dashboard';
import { fetchFee } from '../../../redux/modules/dashboard/txFee';

import ContributeForm from '../ContributeForm';
import BalanceInfo from '../BalanceInfo';
import IcoStatus from '../IcoStatus';

import s from './styles.scss';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchDashboard, fetchFee } = this.props;

    fetchDashboard();
    fetchFee();
  }

  render() {
    const { t } = this.props;
    return (
      <div className={s.main}>
        <div className={s.topbar}>
          <div className={s.title}>{t('title')}</div>
        </div>
        <div className={s.children}>
          <div className={s.left}>
            <div className={s.buyTokensForm}>
              <ContributeForm/>
            </div>
          </div>
          <div className={s.right}>
            <div className={s.widget}><BalanceInfo/></div>
            <div className={s.widget}><IcoStatus/></div>
          </div>
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('dashboard')(Dashboard);
export default connect(
  null,
  {
    fetchDashboard,
    fetchFee
  }
)(TranslatedComponent);
