import { IReduxState } from '../interfaces/IReduxState';
import getLocalUuid from './getLocalUuid';

export default (state: IReduxState, resourceUri: string) => {
  let localUuid = getLocalUuid(state, resourceUri);
  return localUuid &&
         state &&
         state.resources &&
         state.resources[localUuid];
};
