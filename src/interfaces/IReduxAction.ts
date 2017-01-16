import {
  IActionIdmapCreateLocalOnly,
  IActionIdmapCreateLocalWithRemote,
  IActionIdmapDelete,
} from '../actionCreators/idMap';

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
  IActionResourcesFailAction,
  IActionResourcesFailToLoad,
  IActionResourcesFailToSave,
  IActionResourcesFailToUpdate,
  IActionResourcesFinishLoading,
  IActionResourcesFinishLoadingCommon,
  IActionResourcesFinishLoadingSafe,
  IActionResourcesInitialize,
  IActionResourcesInvalidate,
  IActionResourcesStartAction,
  IActionResourcesStartLoading,
  IActionResourcesStartSaving,
  IActionResourcesStartUpdating,
  IActionResourcesUpdateLocally,
} from '../actionCreators/resources';

export type IReduxAction =
  IActionIdmapCreateLocalOnly |
  IActionIdmapCreateLocalWithRemote |
  IActionIdmapDelete |
  IActionQueriesFailToLoad |
  IActionQueriesInvalidateByQuery |
  IActionQueriesInvalidateByResource |
  IActionQueriesPushElement |
  IActionQueriesReceive |
  IActionQueriesStartLoading |
  IActionResourcesDelete |
  IActionResourcesFailAction |
  IActionResourcesFailToLoad |
  IActionResourcesFailToSave |
  IActionResourcesFailToUpdate |
  IActionResourcesFinishLoading |
  IActionResourcesFinishLoadingCommon |
  IActionResourcesFinishLoadingSafe |
  IActionResourcesInitialize |
  IActionResourcesInvalidate |
  IActionResourcesStartAction |
  IActionResourcesStartLoading |
  IActionResourcesStartSaving |
  IActionResourcesStartUpdating |
  IActionResourcesUpdateLocally;
