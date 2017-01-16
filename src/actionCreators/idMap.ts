import * as uuid from 'uuid';

interface IActionIdmapCreateLocalWithRemote {
  type: 'CREATE_LOCAL_UUID_WITH_REMOTE';
  local: string;
  remote: string;
};
let createLocalWithRemote = (resourceUri: string): IActionIdmapCreateLocalWithRemote => {
  return {
    type: 'CREATE_LOCAL_UUID_WITH_REMOTE',
    local: uuid.v4(),
    remote: resourceUri
  };
};

// This action creator uses the same action as CREATE_LOCAL_WITH_REMOTE, only it sources the arguments
// differently. Since it's the same task for the reducer we can reuse the action type.
let updateLocalWithRemote = (localUuid: string, resourceUri: string): IActionIdmapCreateLocalWithRemote => {
  return {
    type: 'CREATE_LOCAL_UUID_WITH_REMOTE',
    local: localUuid,
    remote: resourceUri
  };
};

interface IActionIdmapCreateLocalOnly {
  type: 'CREATE_LOCAL_ONLY_UUID';
  local: string;
};
let createLocalOnly = (): IActionIdmapCreateLocalOnly => {
  return {
    type: 'CREATE_LOCAL_ONLY_UUID',
    local: uuid.v4()
  };
};

interface IActionIdmapDelete {
  type: 'DELETE_UUID';
  local: string;
};
let delete_ = (localUuid: string): IActionIdmapDelete => {
  return {
    type: 'DELETE_UUID',
    local: localUuid
  };
};

export {
  IActionIdmapCreateLocalOnly,
  IActionIdmapCreateLocalWithRemote,
  IActionIdmapDelete,
};

export default {
  createLocalOnly,
  createLocalWithRemote,
  delete: delete_,
  updateLocalWithRemote,
};
