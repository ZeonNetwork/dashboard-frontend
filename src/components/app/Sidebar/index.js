import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon, Button } from '@blueprintjs/core';

import { changeTheme } from '../../../redux/modules/app/theme';
import s from './styles.scss';

import * as routes from '../../../routes';
import { THEMES } from '../../../utils/theme';

const SideBar = (props) => {
  const {
    t,
    kyc,
    logout,
    changeTheme,
    theme
  } = props;
  const renderNavItems = () => (
    <div>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.DASHBOARD} to={routes.DASHBOARD}>
        <Icon icon={<img src={require('../../../assets/images/icons/custom/dashboard.svg')}/>}/><span>{t('topbar.nav.dashboard')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.TRANSACTIONS} to={routes.TRANSACTIONS}>
        <Icon icon={<img src={require('../../../assets/images/icons/custom/transaction.svg')}/>}/><span>{t('topbar.nav.txs')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.REFERRALS} to={routes.REFERRALS}>
        <Icon icon={<img src={require('../../../assets/images/icons/custom/partner-program.svg')}/>}/><span>{t('topbar.nav.referral')}</span>
      </NavLink>
      {!kyc
        ? (
          <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} to={routes.KYC_VERIFICATION}>
            <Icon icon={<img src={require('../../../assets/images/icons/custom/verification.svg')}/>}/><span>{t('topbar.nav.verification')}</span>
          </NavLink>
        )
        : null}
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/light-mode.svg')}/>} text='Voting [Nov]'/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/light-mode.svg')}/>} text='Trade [Nov]'/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/light-mode.svg')}/>} text='Smart investing [Dec]'/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/light-mode.svg')}/>} text='Distribution [Dec]'/>
      <a className={`pt-button pt-minimal ${s.sidebar_links}`} href='https://forms.amocrm.ru/tzvrvc' target='_blank'>
        <Icon icon='people'/><span>Card [Soon]</span>
      </a>
    </div>
  );

  const renderThemeToggler = () =>
    (theme === THEMES.dark
      ? <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/light-mode.svg')}/>} text={t('topbar.nav.themeLight')}
                onClick={() => changeTheme(THEMES.light)}/>
      : <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon={<img src={require('../../../assets/images/icons/custom/night-mode.svg')}/>} text={t('topbar.nav.themeDark')}
                onClick={() => changeTheme(THEMES.dark)}/>);

  return (
    <div>
      <div className={s.logo}>{t('topbar.brand')}</div>
      <div>
        {renderNavItems()}
      </div>
      <NavLink
        to={routes.SETTINGS}
        className={`pt-button pt-minimal ${s.sidebar_links}`}
        tabIndex="0">
        <Icon icon={<img src={require('../../../assets/images/icons/custom/settings.svg')}/>}/>
        <span>{t('topbar.nav.settings')}</span>
      </NavLink>
      <Button
        className={`pt-button pt-minimal ${s.sidebar_links}`}
        icon={<img src={require('../../../assets/images/icons/custom/logout.svg')}/>}
        text={t('topbar.nav.logout')}
        onClick={() => logout()}/>
      <div className={s.theme_swith}>
        {renderThemeToggler()}
      </div>
    </div>
  );
};

const ConnectedComponent = connect(
  (state) => ({ ...state.app.theme }),
  { changeTheme }
)(SideBar);

const TranslatedComponent = translate('app')(ConnectedComponent);
export default TranslatedComponent;
