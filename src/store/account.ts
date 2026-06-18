import { AccountInfo } from '@/types';
import { mockAccounts } from '@/data/videos';

type Listener = (account: AccountInfo) => void;

class AccountStore {
  private currentAccount: AccountInfo = mockAccounts[0];
  private listeners: Set<Listener> = new Set();

  getCurrentAccount(): AccountInfo {
    return this.currentAccount;
  }

  setCurrentAccount(account: AccountInfo): void {
    this.currentAccount = account;
    this.listeners.forEach(listener => listener(account));
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const accountStore = new AccountStore();
