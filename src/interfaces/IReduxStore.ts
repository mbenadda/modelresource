import { IReduxAction } from './IReduxAction';
import { IReduxState } from './IReduxState';
import { Observable } from 'rxjs/Observable';

export interface IReduxStore extends Observable<IReduxState> {
  dispatch: { (action: IReduxAction): void };
  getValue: { (): IReduxState };
};
