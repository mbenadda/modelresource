import { IReduxAction } from '../interfaces/IReduxAction';
import { IReduxState } from '../interfaces/IReduxState';
import idmapReducer from './idMap';
import queriesReducer from './queries';
import resourcesReducer from './resources';

export default (state: IReduxState, action: IReduxAction) => {
  return {
    idmap: idmapReducer(state && state.idmap, action),
    queries: queriesReducer(state && state.queries, action),
    resources: resourcesReducer(state && state.resources, action),
  };
};
