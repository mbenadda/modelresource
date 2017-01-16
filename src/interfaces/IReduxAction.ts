import {
  ActionIdmapCreateLocalOnly,
  ActionIdmapCreateLocalWithRemote,
  ActionIdmapDelete,
} from '../actionCreators/idMap';

import {
  ActionQueriesFailToLoad,
  ActionQueriesInvalidateByQuery,
  ActionQueriesInvalidateByResource,
  ActionQueriesPushElement,
  ActionQueriesReceive,
  ActionQueriesStartLoading,
} from '../actionCreators/queries';

import {
  ActionResourcesDelete,
  ActionResourcesFailAction,
  ActionResourcesFailToLoad,
  ActionResourcesFailToSave,
  ActionResourcesFailToUpdate,
  ActionResourcesFinishLoading,
  ActionResourcesFinishLoadingSafe,
  ActionResourcesInitialize,
  ActionResourcesInvalidate,
  ActionResourcesStartAction,
  ActionResourcesStartLoading,
  ActionResourcesStartSaving,
  ActionResourcesStartUpdating,
  ActionResourcesUpdateLocally,
} from '../actionCreators/resources';

export type IReduxAction =
  ActionIdmapCreateLocalOnly |
  ActionIdmapCreateLocalWithRemote |
  ActionIdmapDelete |
  ActionQueriesFailToLoad |
  ActionQueriesInvalidateByQuery |
  ActionQueriesInvalidateByResource |
  ActionQueriesPushElement |
  ActionQueriesReceive |
  ActionQueriesStartLoading |
  ActionResourcesDelete |
  ActionResourcesFailAction |
  ActionResourcesFailToLoad |
  ActionResourcesFailToSave |
  ActionResourcesFailToUpdate |
  ActionResourcesFinishLoading |
  ActionResourcesFinishLoadingSafe |
  ActionResourcesInitialize |
  ActionResourcesInvalidate |
  ActionResourcesStartAction |
  ActionResourcesStartLoading |
  ActionResourcesStartSaving |
  ActionResourcesStartUpdating |
  ActionResourcesUpdateLocally;
