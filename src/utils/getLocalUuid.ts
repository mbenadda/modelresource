import { IReduxState } from '../interfaces/IReduxState';

export default (state: IReduxState, resourceUri: string) => {
  return state &&
         state.idmap &&
         state.idmap.internalId &&
         state.idmap.internalId[resourceUri];
};
