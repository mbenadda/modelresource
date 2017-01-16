import { IModel } from '../interfaces/IModel';
import { IResource } from '../interfaces/IResource';
import idMapActions from './idMap';

class ActionResourcesDelete {
  readonly type: 'DELETE_RESOURCE';
  readonly localUuid: string;
  readonly modelName: string;
  readonly resourceUri: string;

  constructor (resource: IResource) {
    this.type = 'DELETE_RESOURCE';
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
    this.resourceUri = resource.resource_uri;
  };
};
let delete_ = (resource: IResource) => {
  return new ActionResourcesDelete(resource);
};

class ActionResourcesFailAction {
  readonly type: 'FAIL_ACTION_RESOURCE';
  readonly Constructor: IModel;
  readonly error: Error;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resource: IResource, error: Error) {
    this.type = 'FAIL_ACTION_RESOURCE';
    this.Constructor = resource.constructor;
    this.error = error;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
  };
};
let failAction = (resource: IResource, error: Error) => {
  return new ActionResourcesFailAction(resource, error);
};

// The initial request to get the resource failed
class ActionResourcesFailToLoad {
  readonly type: 'FAIL_TO_LOAD_RESOURCE';
  readonly Constructor: IModel;
  readonly error: Error;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resourceUri: string, error: Error, Constructor: IModel) {
    this.type = 'FAIL_TO_LOAD_RESOURCE';
    this.Constructor = Constructor;
    this.error = error;
    this.localUuid = Constructor.getOrCreateLocalUuid(resourceUri);
    this.modelName = Constructor.meta.modelName;
  };
};
let failToLoad = (resourceUri: string, error: Error, Constructor: IModel) => {
  return new ActionResourcesFailToLoad(resourceUri, error, Constructor);
};

class ActionResourcesFailToSave {
  readonly type: 'FAIL_TO_SAVE_RESOURCE';
  readonly Constructor: IModel;
  readonly error: Error;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resource: IResource, error: Error) {
    this.type = 'FAIL_TO_SAVE_RESOURCE';
    this.Constructor = resource.constructor;
    this.error = error;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
  };
};
let failToSave = (resource: IResource, error: Error) => {
  return new ActionResourcesFailToSave(resource, error);
};

// An update resource failed: revert the update on state
class ActionResourcesFailToUpdate {
  readonly type: 'FAIL_TO_UPDATE_RESOURCE';
  readonly Constructor: IModel;
  readonly error: Error;
  readonly localUuid: string;
  readonly modelName: string;
  readonly revertProps: { [propName: string]: any };

  constructor (resource: IResource, error: Error, revertProps: { [propName: string]: any }) {
    this.type = 'FAIL_TO_UPDATE_RESOURCE';
    this.Constructor = resource.constructor;
    this.error = error;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
    this.revertProps = revertProps;
  };
};
let failToUpdate = (resource: IResource, error: Error, revertProps: { [propName: string]: any }) => {
  return new ActionResourcesFailToUpdate(resource, error, revertProps);
};

// We just received a new version for the resource
// The safe variant is useful when these actions are consumed in the query reducers
class ActionResourcesFinishLoading {
  readonly type: 'FINISH_LOADING_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly resource: IResource;

  constructor (localUuid: string, resource: IResource) {
    this.type = 'FINISH_LOADING_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = localUuid;
    this.modelName = resource.constructor.meta.modelName;
    this.resource = resource;
  };
};
class ActionResourcesFinishLoadingSafe {
  readonly type: 'FINISH_SAFE_LOADING_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly resource: IResource;

  constructor (localUuid: string, resource: IResource) {
    this.type = 'FINISH_SAFE_LOADING_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = localUuid;
    this.modelName = resource.constructor.meta.modelName;
    this.resource = resource;
  };
};
let receive = (resource: IResource, isSafe?: boolean) => {
  let localUuid = resource.constructor.getOrCreateLocalUuid(resource.resource_uri);
  return isSafe ?
    new ActionResourcesFinishLoadingSafe(localUuid, resource) :
    new ActionResourcesFinishLoading(localUuid, resource);
};

// Reuse the FINISH_LOADING_RESOURCE action, but fill its props differently
let finishSaving = (localUuid: string, resource: IResource) => {
  resource.constructor.store.dispatch(idMapActions.updateLocalWithRemote(localUuid, resource.resource_uri));
  return new ActionResourcesFinishLoading(localUuid, resource);
};

class ActionResourcesInitialize {
  readonly type: 'INITIALIZE_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly resource: IResource;

  constructor (localUuid: string, resource: IResource) {
    this.type = 'INITIALIZE_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = localUuid;
    this.modelName = resource.constructor.meta.modelName;
    this.resource = resource;
  };
};
let initialize = (resource: IResource) => {
  let dependentAction = idMapActions.createLocalOnly();
  resource.constructor.store.dispatch(dependentAction);
  return new ActionResourcesInitialize(dependentAction.local, resource);
};

class ActionResourcesInvalidate {
  readonly type: 'INVALIDATE_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resource: IResource) {
    this.type = 'INVALIDATE_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
  };
};
let invalidate = (resource: IResource) => {
  return new ActionResourcesInvalidate(resource);
};

class ActionResourcesStartAction {
  readonly type: 'START_ACTION_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resource: IResource) {
    this.type = 'START_ACTION_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
  };
};
let startAction = (resource: IResource) => {
  return new ActionResourcesStartAction(resource);
};

// We just dispatched a request to get the resource
class ActionResourcesStartLoading {
  readonly type: 'START_LOADING_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly resourceUri: string;

  constructor (resourceUri: string, Constructor: IModel) {
    this.type = 'START_LOADING_RESOURCE';
    this.Constructor = Constructor;
    this.localUuid = Constructor.getOrCreateLocalUuid(resourceUri);
    this.modelName = Constructor.meta.modelName;
    this.resourceUri = resourceUri;
  };
};
let request = (resourceUri: string, Constructor: IModel) => {
  return new ActionResourcesStartLoading(resourceUri, Constructor);
};

// We're starting to save a new resource to the server: it must already exist in our internal store
class ActionResourcesStartSaving {
  readonly type: 'START_SAVING_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;

  constructor (resource: IResource) {
    this.type = 'START_SAVING_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
  };
};
let startToSave = (resource: IResource) => {
  return new ActionResourcesStartSaving(resource);
};

// Start updating the resource: update the state with the new props
class ActionResourcesStartUpdating {
  readonly type: 'START_UPDATING_RESOURCE';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly props: { [propName: string]: any };

  constructor (resource: IResource, props: { [propName: string]: any }) {
    this.type = 'START_UPDATING_RESOURCE';
    this.Constructor = resource.constructor;
    this.localUuid = resource.constructor.getOrCreateLocalUuid(resource.resource_uri);
    this.modelName = resource.constructor.meta.modelName;
    this.props = props;
  };
};
let update = (resource: IResource, props: { [propName: string]: any }) => {
  return new ActionResourcesStartUpdating(resource, props);
};

class ActionResourcesUpdateLocally {
  readonly type: 'UPDATE_RESOURCE_LOCALLY';
  readonly Constructor: IModel;
  readonly localUuid: string;
  readonly modelName: string;
  readonly props: { [propName: string]: any };

  constructor (resource: IResource, props: { [propName: string]: any }) {
    this.type = 'UPDATE_RESOURCE_LOCALLY';
    this.Constructor = resource.constructor;
    this.localUuid = resource.__local_uuid;
    this.modelName = resource.constructor.meta.modelName;
    this.props = props;
  };
};
let updateLocally = (resource: IResource, props: { [propName: string]: any }) => {
  return new ActionResourcesUpdateLocally(resource, props);
};

export {
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
