import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

import { changeTheme } from '../../../redux/modules/app/theme';
import s from './styles.scss';

import * as routes from '../../../routes';
import { THEMES } from '../../../utils/theme';

const SideBar = (props) => {
  const {
    t,
    // kyc,
    logout,
    changeTheme,
    theme
  } = props;

  const renderNavItems = () => (
    <div>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.DASHBOARD} to={routes.DASHBOARD}
               activeClassName='menu-active'>
        <div className={`${s.navlinkIcon} ${s.dashboard} ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
        <span>{t('topbar.nav.dashboard')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.TRANSACTIONS} to={routes.TRANSACTIONS}
               activeClassName='menu-active'>
        <div className={`${s.navlinkIcon} ${s.transaction} ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
        <span>{t('topbar.nav.txs')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.REFERRALS} to={routes.REFERRALS}
               activeClassName='menu-active'>
        <div className={`${s.navlinkIcon} ${s['partner-program']} ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
        <span>{t('topbar.nav.referral')}</span>
      </NavLink>
      {/* {!kyc
        ? (
          <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`}
           to={routes.KYC_VERIFICATION} activeClassName='menu-active'>
            <div className={`${s.navlinkIcon} ${s.verification}
             ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
            <span>{t('topbar.nav.verification')}</span>
          </NavLink>
        )
        : null} */}
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal
              icon={(theme === THEMES.dark)
                ? <img src={require('../../../assets/images/icons/custom/dark/voting.svg')}/>
                : <img src={require('../../../assets/images/icons/custom/light/voting.svg')}/>
              } text={t('topbar.nav.voting')}/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal
              icon={(theme === THEMES.dark)
                ? <img src={require('../../../assets/images/icons/custom/dark/trade.svg')}/>
                : <img src={require('../../../assets/images/icons/custom/light/trade.svg')}/>
              } text={t('topbar.nav.trade')}/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal
              icon={(theme === THEMES.dark)
                ? <img src={require('../../../assets/images/icons/custom/dark/smart.svg')}/>
                : <img src={require('../../../assets/images/icons/custom/light/smart.svg')}/>
              } text={t('topbar.nav.smart')}/>
      <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal
              icon={(theme === THEMES.dark)
                ? <img src={require('../../../assets/images/icons/custom/dark/distrib.svg')}/>
                : <img src={require('../../../assets/images/icons/custom/light/distrib.svg')}/>
              } text={t('topbar.nav.distrib')}/>
      <a className={`pt-button pt-minimal ${s.sidebar_links}`} href='https://forms.amocrm.ru/tzvrvc' target='_blank'>
        <div className={`${s.navlinkIcon} ${s.card} ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
        <span>{t('topbar.nav.card')}</span>
      </a>
    </div>
  );

  const renderThemeToggler = () =>
    (theme === THEMES.dark
      ? <Button className={`pt-button pt-minimal ${s.sidebar_links} active-button`} minimal
                icon={<img src={require('../../../assets/images/icons/custom/dark_active/light-mode.svg')}/>} text={t('topbar.nav.themeLight')}
                onClick={() => changeTheme(THEMES.light)}/>
      : <Button className={`pt-button pt-minimal ${s.sidebar_links} active-button`} minimal
                icon={<img src={require('../../../assets/images/icons/custom/light_active/dark-mode.svg')}/>} text={t('topbar.nav.themeDark')}
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
        tabIndex="0"
        activeClassName='menu-active'>
        <div className={`${s.navlinkIcon} ${s.settings} ${(theme === THEMES.dark) ? s.dark : s.light}`}/>
        <span>{t('topbar.nav.settings')}</span>
      </NavLink>
      <Button
        className={`pt-button pt-minimal ${s.sidebar_links}`}
        icon={(theme === THEMES.dark)
          ? <img src={require('../../../assets/images/icons/custom/dark/logout.svg')}/>
          : <img src={require('../../../assets/images/icons/custom/light/logout.svg')}/>
        }
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
const ComponentWithRouter = withRouter(ConnectedComponent);
const TranslatedComponent = translate('app')(ComponentWithRouter);
export default TranslatedComponent;
