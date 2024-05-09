import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import css from './WelcomeSection.module.css';

export const WelcomeSection = () => {
  return (
    <div className={css.welcomSection}>
      <div className={css.contant}>
        <div className={css.logoThumb}>
          <Logo />
        </div>
        <p className={css.text}>Record daily water intake and track</p>
        <h1 className={css.mainTitle}>Water consumption tracker</h1>
        <div>
          <NavLink className={css.linkTracker}>Try tracker</NavLink>
          <NavLink className={css.linkSignIn}>Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};
