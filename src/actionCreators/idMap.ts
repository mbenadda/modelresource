import * as uuid from 'uuid';

class ActionIdmapCreateLocalWithRemote {
  readonly type: 'CREATE_LOCAL_UUID_WITH_REMOTE';
  readonly local: string;
  readonly remote: string;

  constructor (localUuid: string, resourceUri: string) {
    this.type = 'CREATE_LOCAL_UUID_WITH_REMOTE';
    this.local = localUuid;
    this.remote = resourceUri;
  };
};
let createLocalWithRemote = (resourceUri: string) => {
  return new ActionIdmapCreateLocalWithRemote(uuid.v4(), resourceUri);
};

// This action creator uses the same action as CREATE_LOCAL_WITH_REMOTE, only it sources the arguments
// differently. Since it's the same task for the reducer we can reuse the action type.
let updateLocalWithRemote = (localUuid: string, resourceUri: string) => {
  return new ActionIdmapCreateLocalWithRemote(localUuid, resourceUri);
};

class ActionIdmapCreateLocalOnly {
  readonly type: 'CREATE_LOCAL_ONLY_UUID';
  readonly local: string;

  constructor () {
    this.type = 'CREATE_LOCAL_ONLY_UUID';
    this.local = uuid.v4();
  };
};
let createLocalOnly = () => {
  return new ActionIdmapCreateLocalOnly();
};

class ActionIdmapDelete {
  readonly type: 'DELETE_UUID';
  readonly local: string;

  constructor (localUuid: string) {
    this.type = 'DELETE_UUID';
    this.local = localUuid;
  }
};
let delete_ = (localUuid: string) => {
  return new ActionIdmapDelete(localUuid);
};

export {
  ActionIdmapCreateLocalOnly,
  ActionIdmapCreateLocalWithRemote,
  ActionIdmapDelete,
};

export default {
  createLocalOnly,
  createLocalWithRemote,
  delete: delete_,
  updateLocalWithRemote,
};
