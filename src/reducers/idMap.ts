import { IReduxAction } from '../interfaces/IReduxAction';
import { IReduxStateIdmap } from '../interfaces/IReduxState';
import omit from 'lodash/omit';

export default (state: IReduxStateIdmap, action: IReduxAction): IReduxStateIdmap => {
  if (typeof state === 'undefined') {
    state = { internalId: {}, externalId: {} };
  }

  switch (action.type) {
    case 'CREATE_LOCAL_UUID_WITH_REMOTE':
      return {
        externalId: {
          ...state.externalId,
          [action.local]: action.remote,
        },
        internalId: {
          ...state.internalId,
          [action.remote]: action.local,
        },
      };

    case 'CREATE_LOCAL_ONLY_UUID':
      return {
        externalId: {
          ...state.externalId,
          [action.local]: null,
        },
        internalId: state.internalId,
      };

    case 'DELETE_UUID':
      return {
        internalId: omit(state.internalId, state.externalId[action.local] || '') as { [internalId: string]: null | string | undefined },
        externalId: omit(state.externalId, action.local) as { [externalId: string]: null | string | undefined }
      };

    default:
      return state;
  }
};
