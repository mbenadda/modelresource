import { IReduxState } from '../interfaces/IReduxState';

export default (state: IReduxState, localUuid: string) => {
  return state &&
         state.resources &&
         state.resources[localUuid];
};
