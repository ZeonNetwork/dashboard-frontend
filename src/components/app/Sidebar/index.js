import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons/lib/esm/index';

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
        <Icon icon='dashboard'/><span>{t('topbar.nav.dashboard')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.TRANSACTIONS} to={routes.TRANSACTIONS}>
        <Icon icon='exchange'/><span>{t('topbar.nav.txs')}</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.REFERRALS} to={routes.REFERRALS}>
        <Icon icon='people'/><span>{t('topbar.nav.referral')}</span>
      </NavLink>
      {!kyc
        ? (
          <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} to={routes.KYC_VERIFICATION}>
            <Icon icon='endorsed'/><span>{t('topbar.nav.verification')}</span>
          </NavLink>
        )
        : null}
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.VOTING} to={routes.VOTING}>
        <Icon icon='people'/><span>Voting</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.TRADE} to={routes.TRADE}>
        <Icon icon='people'/><span>Trade</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.SMART_INVESTING} to={routes.SMART_INVESTING}>
        <Icon icon='people'/><span>Smart investing</span>
      </NavLink>
      <NavLink className={`pt-button pt-minimal ${s.sidebar_links}`} key={routes.DISTRIBUTION} to={routes.DISTRIBUTION}>
        <Icon icon='people'/><span>Distribution</span>
      </NavLink>
      <a className={`pt-button pt-minimal ${s.sidebar_links}`} href='https://forms.amocrm.ru/tzvrvc' target='_blank'>
        <Icon icon='people'/><span>Card</span>
      </a>
    </div>
  );

  const renderThemeToggler = () =>
    (theme === THEMES.dark
      ? <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon="flash" text={t('topbar.nav.themeLight')}
                onClick={() => changeTheme(THEMES.light)}/>
      : <Button className={`pt-button pt-minimal ${s.sidebar_links}`} minimal icon="moon" text={t('topbar.nav.themeDark')}
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
        <Icon icon={IconNames.COG}/>
        <span>{t('topbar.nav.settings')}</span>
      </NavLink>
      <Button
        className={`pt-button pt-minimal ${s.sidebar_links}`}
        icon="log-out"
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
