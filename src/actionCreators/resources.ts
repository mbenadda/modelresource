import { IModel } from '../interfaces/IModel';
import { IResource } from '../interfaces/IResource';
import idMapActions from './idMap';

interface IActionResourcesDelete {
  type: 'DELETE_RESOURCE';
  localUuid: string;
  modelName: string;
  resourceUri: string;
};
let delete_ = (resource: IResource): IActionResourcesDelete => {
  return {
    type: 'DELETE_RESOURCE',
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
    resourceUri: resource.resource_uri,
  };
};

interface IActionResourcesFailAction {
  type: 'FAIL_ACTION_RESOURCE';
  Constructor: IModel;
  error: Error;
  localUuid: string;
  modelName: string;
};
let failAction = (resource: IResource, error: Error): IActionResourcesFailAction => {
  return {
    type: 'FAIL_ACTION_RESOURCE',
    Constructor: resource.constructor,
    error,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
  };
};

// The initial request to get the resource failed
interface IActionResourcesFailToLoad {
  type: 'FAIL_TO_LOAD_RESOURCE';
  Constructor: IModel;
  error: Error;
  localUuid: string;
  modelName: string;
};
let failToLoad = (resourceUri: string, error: Error, Constructor: IModel): IActionResourcesFailToLoad => {
  return {
    type: 'FAIL_TO_LOAD_RESOURCE',
    Constructor,
    error,
    localUuid: Constructor.getOrCreateLocalUuid(resourceUri),
    modelName: Constructor.meta.modelName,
  };
};

interface IActionResourcesFailToSave {
  type: 'FAIL_TO_SAVE_RESOURCE';
  Constructor: IModel;
  error: Error;
  localUuid: string;
  modelName: string;
};
let failToSave = (resource: IResource, error: Error): IActionResourcesFailToSave => {
  return {
    type: 'FAIL_TO_SAVE_RESOURCE',
    Constructor: resource.constructor,
    error,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
  };
};

// An update resource failed: revert the update on state
interface IActionResourcesFailToUpdate {
  type: 'FAIL_TO_UPDATE_RESOURCE';
  Constructor: IModel;
  error: Error;
  localUuid: string;
  modelName: string;
  revertProps: { [propName: string]: any };
};
let failToUpdate = (resource: IResource, error: Error, revertProps: { [propName: string]: any }):
IActionResourcesFailToUpdate => {
  return {
    type: 'FAIL_TO_UPDATE_RESOURCE',
    Constructor: resource.constructor,
    error,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
    revertProps,
  };
};

// We just received a new version for the resource
// The safe variant is useful when these actions are consumed in the query reducers
interface IActionResourcesFinishLoadingCommon {
  type: string;
  Constructor: IModel;
  localUuid: string;
  modelName: string;
  resource: IResource;
};
interface IActionResourcesFinishLoading extends IActionResourcesFinishLoadingCommon {
  type: 'FINISH_LOADING_RESOURCE';
};
interface IActionResourcesFinishLoadingSafe extends IActionResourcesFinishLoadingCommon {
  type: 'FINISH_SAFE_LOADING_RESOURCE';
};
let receive = (resource: IResource, isSafe: boolean): IActionResourcesFinishLoadingCommon => {
  return {
    type: isSafe ? 'FINISH_SAFE_LOADING_RESOURCE' : 'FINISH_LOADING_RESOURCE',
    Constructor: resource.constructor,
    localUuid: resource.constructor.getOrCreateLocalUuid(resource.resource_uri),
    modelName: resource.constructor.meta.modelName,
    resource,
  };
};

// Reuse the FINISH_LOADING_RESOURCE action, but fill its props differently
let finishSaving = (localUuid: string, resource: IResource): IActionResourcesFinishLoading => {
  resource.constructor.store.dispatch(idMapActions.updateLocalWithRemote(localUuid, resource.resource_uri));
  return {
    type: 'FINISH_LOADING_RESOURCE',
    Constructor: resource.constructor,
    localUuid,
    modelName: resource.constructor.meta.modelName,
    resource,
  };
};

interface IActionResourcesInitialize {
  type: 'INITIALIZE_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
  resource: IResource;
};
let initialize = (resource: IResource): IActionResourcesInitialize => {
  let dependentAction = idMapActions.createLocalOnly();
  resource.constructor.store.dispatch(dependentAction);

  return {
    type: 'INITIALIZE_RESOURCE',
    Constructor: resource.constructor,
    localUuid: dependentAction.local,
    modelName: resource.constructor.meta.modelName,
    resource,
  };
};

interface IActionResourcesInvalidate {
  type: 'INVALIDATE_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
};
let invalidate = (resource: IResource): IActionResourcesInvalidate => {
  return {
    type: 'INVALIDATE_RESOURCE',
    Constructor: resource.constructor,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
  };
};

interface IActionResourcesStartAction {
  type: 'START_ACTION_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
};
let startAction = (resource: IResource): IActionResourcesStartAction => {
  return {
    type: 'START_ACTION_RESOURCE',
    Constructor: resource.constructor,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
  };
};

// We just dispatched a request to get the resource
interface IActionResourcesStartLoading {
  type: 'START_LOADING_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
  resourceUri: string;
};
let request = (resourceUri: string, Constructor: IModel): IActionResourcesStartLoading => {
  return {
    type: 'START_LOADING_RESOURCE',
    Constructor,
    localUuid: Constructor.getOrCreateLocalUuid(resourceUri),
    modelName: Constructor.meta.modelName,
    resourceUri,
  };
};

// We're starting to save a new resource to the server: it must already exist in our internal store
interface IActionResourcesStartSaving {
  type: 'START_SAVING_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
}
let startToSave = (resource: IResource): IActionResourcesStartSaving => {
  return {
    type: 'START_SAVING_RESOURCE',
    Constructor: resource.constructor,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
  };
};

// Start updating the resource: update the state with the new props
interface IActionResourcesStartUpdating {
  type: 'START_UPDATING_RESOURCE';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
  props: { [propName: string]: any };
};
let update = (resource: IResource, props: { [propName: string]: any }): IActionResourcesStartUpdating => {
  return {
    type: 'START_UPDATING_RESOURCE',
    Constructor: resource.constructor,
    localUuid: resource.constructor.getOrCreateLocalUuid(resource.resource_uri),
    modelName: resource.constructor.meta.modelName,
    props,
  };
};

interface IActionResourcesUpdateLocally {
  type: 'UPDATE_RESOURCE_LOCALLY';
  Constructor: IModel;
  localUuid: string;
  modelName: string;
  props: { [propName: string]: any };
};
let updateLocally = (resource: IResource, props: { [propName: string]: any }): IActionResourcesUpdateLocally => {
  return {
    type: 'UPDATE_RESOURCE_LOCALLY',
    Constructor: resource.constructor,
    localUuid: resource.__local_uuid,
    modelName: resource.constructor.meta.modelName,
    props,
  };
};

export {
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
};

export default {
  delete: delete_,
  failAction,
  failToLoad,
  failToSave,
  failToUpdate,
  finishSaving,
  initialize,
  invalidate,
  receive,
  request,
  startAction,
  startToSave,
  update,
  updateLocally,
};
