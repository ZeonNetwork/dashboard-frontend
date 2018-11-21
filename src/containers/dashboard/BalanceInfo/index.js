import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout, Button, Intent } from '@blueprintjs/core';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Block from '../../../components/dashboard/Block';

import { bigNum } from '../../../helpers/common/common';

const BalanceInfo = (props) => {
  const {
    t,
    fetching,
    openMakeDepositPopup,
    ethBalance,
    icoBalance,
    oldWallet,
    tokenBalance
  } = props;

  return (
    <Callout title={t('balanceInfo.title')}>
      <Block
        label={t('balanceInfo.eth')}
        value={`${bigNum(ethBalance)} ETH`}
        fetching={fetching}/>

      <Block
        label={t('balanceInfo.token')}
        value={`${bigNum(tokenBalance, 2)} ZEON`}
        fetching={fetching}/>

      {icoBalance ? <Block
          label={t('balanceInfo.ico')}
          value={`${bigNum(icoBalance, 2)} ZEON`}
          fetching={fetching}/>
        : ''}

      {oldWallet ? <Block
          size='small'
          label={t('balanceInfo.oldWallet')}
          value={oldWallet}
          fetching={fetching}/>
        : ''}

      <Button
        size="small"
        icon="plus"
        minimal={true}
        text={t('balanceInfo.deposit')}
        intent={Intent.PRIMARY}
        onClick={() => openMakeDepositPopup()}/>
    </Callout>
  );
};

const TranslatedComponent = translate('dashboard')(BalanceInfo);
export default connect(
  (state) => ({
    ...state.dashboard.dashboard,
    icoBalance: state.app.app.user.icoBalance,
    oldWallet: state.app.app.user.oldWallet
  }),
  {
    openMakeDepositPopup
  }
)(TranslatedComponent);
