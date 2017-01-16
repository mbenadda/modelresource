import { IReduxAction } from './IReduxAction';
import { IReduxState } from './IReduxState';

export interface IReduxStore {
  dispatch: { (action: IReduxAction): void };
  getValue: { (): IReduxState };
};
