import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignIn, verifySignIn, closeWalletCreds } from '../../../redux/modules/auth/signIn';

import InitSignInForm from '../../../components/auth/InitSignInForm';
import VerifySignInForm from '../../../components/auth/VerifySignInForm';
import WalletCreds from '../../../components/auth/WalletCreds';

import s from './styles.scss';

const SignIn = (props) => {
  const {
    t,
    step,
    fetching,
    accessToken,
    closeWalletCreds,
    verification: {
      verificationId,
      method
    },
    wallets
  } = props;

  const qp = queryString.parse(props.location.search);

  const renderStep = (s) => {
    if (qp.verificationId && qp.code) {
      return (
        <VerifySignInForm
          onSubmit={verifySignIn}
          fetching={fetching}
          method={method}
          initialValues={{
            accessToken,
            verification: {
              id: qp.verificationId,
              code: qp.code,
              method: 'email'
            }
          }}/>
      );
    }

    if (s === 'initSignIn') {
      return (
        <InitSignInForm
          onSubmit={initSignIn}
          fetching={fetching}/>
      );
    }

    if (s === 'walletCreds') {
      return (
        <WalletCreds
          wallet={wallets[0]}
          closeWalletCreds={closeWalletCreds}/>
      );
    }

    return (
      <VerifySignInForm
        onSubmit={verifySignIn}
        fetching={fetching}
        method={method}
        initialValues={{
          accessToken,
          verification: {
            id: verificationId,
            method
          }
        }}/>
    );
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        {renderStep(step)}
      </div>
      <div className={s.fp}>
        <Link to="/auth/reset-password">{t('signIn.forgotPassword')}</Link>
      </div>
      <div className={s.bottomLink}>
        {t('signIn.notHaveAccount')}{' '}
        <Link to="/auth/sign-up">{t('signIn.signUp')}</Link>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(SignIn);
const ComponentWithRouter = withRouter(TranslatedComponent);
export default connect(
  (state) => ({
    ...state.auth.signIn
  }),
  {
    closeWalletCreds
  }
)(ComponentWithRouter);
