import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout, InputGroup, Button, Intent } from '@blueprintjs/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethAddressIsCopied: false,
      oldWalletIsCopied: false
    };
  }

  render() {
    const {
      t,
      ethAddress,
      oldWallet
    } = this.props;

    const { ethAddressIsCopied, oldWalletIsCopied } = this.state;

    return (
      <div>
        <Callout title={t('address.title')}>
          <InputGroup
            large
            disabled
            value={ethAddress}
            rightElement={
              <CopyToClipboard
                text={ethAddress}
                onCopy={() => this.setState({ ethAddressIsCopied: true })}>
                <Button
                  minimal
                  large
                  intent={Intent.PRIMARY}
                  icon={ethAddressIsCopied ? 'saved' : 'clipboard'}/>
              </CopyToClipboard>
            }/>
        </Callout>
        {oldWallet
          ? <Callout title={t('address.oldWallet')}>
            <InputGroup
              large
              disabled
              value={oldWallet}
              rightElement={
                <CopyToClipboard
                  text={oldWallet}
                  onCopy={() => this.setState({ oldWalletIsCopied: true })}>
                  <Button
                    minimal
                    large
                    intent={Intent.PRIMARY}
                    icon={oldWalletIsCopied ? 'saved' : 'clipboard'}/>
                </CopyToClipboard>
              }/>
          </Callout>
          : ''}
      </div>
    );
  }
}

const TranslatedComponent = translate('settings')(Address);
export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress,
    oldWallet: state.app.app.user.oldWallet
  }),
  null
)(TranslatedComponent);
