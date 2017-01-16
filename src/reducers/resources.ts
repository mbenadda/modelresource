import { IReduxAction } from '../interfaces/IReduxAction';
import { IReduxStateResources } from '../interfaces/IReduxState';
import omit from 'lodash/omit';

export default (state: IReduxStateResources, action: IReduxAction): IReduxStateResources => {
  var newEntity;

  if (typeof state === 'undefined') {
    state = {};
  }

  switch (action.type) {
    case 'DELETE_RESOURCE':
      return omit(state, action.localUuid) as IReduxStateResources;

    case 'FAIL_ACTION_RESOURCE':
    case 'FAIL_TO_LOAD_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __error: action.error,
          __failed_to_load: true,
          __is_loading: false,
          __local_uuid: action.localUuid,
        }),
      };

    case 'FAIL_TO_SAVE_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __error: action.error,
          __failed_to_load: true,
          __has_localonly_data: true,
          __is_loading: false,
          __local_uuid: action.localUuid,
        }),
      };

    case 'FAIL_TO_UPDATE_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          ...action.revertProps,
          __error: action.error,
          __failed_to_load: true,
          __is_loading: false,
          __local_uuid: action.localUuid,
        }),
      };

    case 'FINISH_LOADING_RESOURCE':
    case 'FINISH_SAFE_LOADING_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          ...action.resource,
          __did_invalidate: false,
          __failed_to_load: false,
          __has_localonly_data: false,
          __is_loading: false,
          __last_updated: new Date().getTime(),
          __local_uuid: action.localUuid,
        }),
      };

    case 'INITIALIZE_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...action.resource,
          __has_localonly_data: true,
          __local_uuid: action.localUuid,
        }),
      };

    case 'INVALIDATE_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __did_invalidate: true,
          __local_uuid: action.localUuid,
        }),
      };

    case 'START_ACTION_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __failed_to_load: false,
          __is_loading: true,
          __local_uuid: action.localUuid,
        }),
      };

    case 'START_LOADING_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __failed_to_load: false,
          __is_loading: true,
          __local_uuid: action.localUuid,
          resource_uri: action.resourceUri,
        }),
      };

    case 'START_SAVING_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          __failed_to_load: false,
          __is_loading: true,
          __local_uuid: action.localUuid,
        }),
      };

    case 'START_UPDATING_RESOURCE':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          ...action.props,
          __failed_to_load: false,
          __has_localonly_data: true,
          __is_loading: true,
          __local_uuid: action.localUuid,
        }),
      };

    case 'UPDATE_RESOURCE_LOCALLY':
      return {
        ...state,
        [action.localUuid]: new action.Constructor({
          ...state[action.localUuid],
          ...action.props,
          __has_localonly_data: true,
          __local_uuid: action.localUuid,
        }),
      };

    default:
      return state;
  }
};