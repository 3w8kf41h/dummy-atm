import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppThunk } from '../../redux/store';

export type Bill = '20k' | '10k' | '5k' | '2k' | '1k';

export type BillAmounts = Array<{ bill: Bill; amount: number }>;

type WithdrawalHistoryItem = {
  timestamp: number;
  amount: number;
} & ({ success: false } | { success: true; billAmounts: BillAmounts });

export interface VaultState {
  bills: Record<Bill, number>;
  withdrawalHistory: WithdrawalHistoryItem[];
}

const initialState: VaultState = {
  bills: { '20k': 1, '10k': 1, '5k': 1, '2k': 1, '1k': 0 },
  withdrawalHistory: [],
};

export const vaultSlice = createSlice({
  name: 'vault',
  initialState,
  reducers: {
    incrementCount: (state, action: PayloadAction<Bill>) => {
      state.bills[action.payload] += 1;
    },
    decrementCount: (state, action: PayloadAction<Bill>) => {
      if (state.bills[action.payload] === 0) {return;}
      state.bills[action.payload] -= 1;
    },
    setCount: (state, action: PayloadAction<BillAmounts[number]>) => {
      state.bills[action.payload.bill] = action.payload.amount;
    },
    subtractAmounts: (state, action: PayloadAction<BillAmounts>) => {
      for (const { bill, amount } of action.payload) {
        state.bills[bill] -= amount;
      }
    },
    addWithdrawal: (state, action: PayloadAction<WithdrawalHistoryItem>) => {
      state.withdrawalHistory.unshift(action.payload);
    },
  },
});

export const { incrementCount, decrementCount, subtractAmounts, addWithdrawal, setCount } =
  vaultSlice.actions;

export const selectVaultBills = (state: RootState) => state.vault.bills;
export const selectVaultWithdrawalHistory = (state: RootState) => state.vault.withdrawalHistory;

const valuesOrdered: BillAmounts = [
  { amount: 20000, bill: '20k' },
  { amount: 10000, bill: '10k' },
  { amount: 5000, bill: '5k' },
  { amount: 2000, bill: '2k' },
  { amount: 1000, bill: '1k' },
];

export const withdraw =
  (amount: number): AppThunk<WithdrawalHistoryItem> =>
  (dispatch, getState) => {
    const bills = selectVaultBills(getState());
    let remainder = amount;
    const billAmounts: BillAmounts = [];

    for (const { amount: billValue, bill } of valuesOrdered) {
      if (bills[bill] === 0) {continue;}
      if (remainder < billValue) {continue;}

      const count = Math.floor(remainder / billValue);
      const countAvailable = Math.min(count, bills[bill]);
      billAmounts.push({ bill, amount: countAvailable });
      remainder -= countAvailable * billValue;

      if (remainder === 0) {
        break;
      }
    }

    let result: WithdrawalHistoryItem | undefined;
    const timestamp = Date.now();

    if (remainder === 0) {
      result = { timestamp, amount, success: true, billAmounts };
      dispatch(subtractAmounts(billAmounts));
    } else {
      result = { timestamp, amount, success: false };
    }

    dispatch(addWithdrawal(result));
    return result;
  };

export default vaultSlice.reducer;
