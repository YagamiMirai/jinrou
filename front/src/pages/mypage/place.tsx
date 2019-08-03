import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MyPage } from './component';
import { i18n, I18nProvider } from '../../i18n';
import { Store } from './store';
import { UserProfile } from './defs';

/**
 * Options to place.
 */
export type IPlaceOptions = {
  i18n: i18n;
  /**
   * Node to place.
   */
  node: HTMLElement;
  /**
   * Initial profile of user.
   */
  profile: UserProfile;
  /**
   * Initial state of mailConfirmSecurity
   */
  mailConfirmSecurity: boolean;
} & Omit<React.ComponentProps<typeof MyPage>, 'store'>;

export interface IPlaceResult {
  unmount: () => void;
  store: Store;
}

export function place({
  i18n,
  node,
  profile,
  mailConfirmSecurity,
  ...props
}: IPlaceOptions): IPlaceResult {
  const store = new Store({
    profile,
    mailConfirmSecurity,
  });
  const com = (
    <I18nProvider i18n={i18n}>
      <MyPage store={store} {...props} />
    </I18nProvider>
  );

  ReactDOM.render(com, node);

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(node);
  };

  return { unmount, store };
}
