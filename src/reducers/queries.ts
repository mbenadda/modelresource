import {
  IActionQueriesFailToLoad,
  IActionQueriesInvalidateByQuery,
  IActionQueriesInvalidateByResource,
  IActionQueriesPushElement,
  IActionQueriesReceive,
  IActionQueriesStartLoading,
} from '../actionCreators/queries';
import {
  IActionResourcesDelete,
  IActionResourcesFinishLoading,
} from '../actionCreators/resources';
import { IReduxAction } from '../interfaces/IReduxAction';
import { IReduxStateQueries } from '../interfaces/IReduxState';
import queriesForModelReducer from './queriesForModel';

// The queriesReducer simply acts as a triage: it only runs the relevant queryReducer for the model
// we're updating
export default (state: IReduxStateQueries, action: IReduxAction) => {
  if (typeof state === 'undefined') {
    state = {};
  }

  if (!isRelevantAction(action)) {
    return state;
  }

  return {
    ...state,
    [action.modelName]: queriesForModelReducer(state[action.modelName], action),
  };
};

/*
 * NB: This check does not actually ensure the action belongs to the types listed below: its a shortcut that enables
 * the triage to work using action.modelName. While those types are the ones with which queriesForModelReducer
 * interacts, other actions could go through and just fall to the default case, returning an unchanged state.
*/
function isRelevantAction (action: IReduxAction): action is IActionQueriesFailToLoad |
  IActionQueriesInvalidateByQuery | IActionQueriesInvalidateByResource | IActionQueriesPushElement |
  IActionQueriesReceive | IActionQueriesStartLoading | IActionResourcesDelete | IActionResourcesFinishLoading { 
  return action.hasOwnProperty('modelName');
}
