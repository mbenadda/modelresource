import { IReduxAction } from './IReduxAction';
import { IReduxState } from './IReduxState';
import { Observable } from 'rxjs/Observable';

export interface IReduxGlobalStore extends Observable<{ [path: string]: IReduxState }> {
  dispatch: { (action: IReduxAction): void };
  getValue: { (): { [path: string]: IReduxState } };
};

export interface IReduxLocalStore extends Observable<IReduxState> {
  dispatch: { (action: IReduxAction): void };
  getValue: { (): IReduxState };
};
