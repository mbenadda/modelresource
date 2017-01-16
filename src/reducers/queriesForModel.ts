import { IQuery } from '../interfaces/IQuery';
import { IReduxAction } from '../interfaces/IReduxAction';
import { IReduxStateQueriesForModel } from '../interfaces/IReduxState';

export default (state: IReduxStateQueriesForModel, action: IReduxAction): IReduxStateQueriesForModel => {
  let queryKey: string | undefined;

  if (typeof state === 'undefined') {
    state = {};
  }

  switch (action.type) {
    case 'FAIL_TO_LOAD_QUERY':
      queryKey = JSON.stringify(action.query);
      return {
        ...state,
        [queryKey]: {
          ...state[queryKey],
          __failed_to_load: true,
          __is_loading: false,
        },
      };

    case 'INVALIDATE_QUERY_BY_QUERY':
      queryKey = JSON.stringify(action.query);
      return {
        ...state,
        [queryKey]: {
          ...state[queryKey],
          __did_invalidate: true,
        },
      };

    // Intentional fallthrough for other actions with similar handling
    case 'INVALIDATE_QUERY_BY_RESOURCE':
    case 'DELETE_RESOURCE':
    case 'FINISH_LOADING_RESOURCE':
      return Object.keys(state).reduce((acc, key, index, array) => {
        return {
          ...acc,
          [key]: {
            ...(acc[key]),
            __did_invalidate: true,
          },
        };
      }, { ...state });

    case 'PUSH_ELEMENT_INTO_QUERY':
      queryKey = JSON.stringify(action.query);
      // We can't add elements to a query that we don't have yet. It should be complete when we receive it
      // from the server at the time we need it, later on
      if (!state[queryKey]) { return state; }

      return {
        ...state,
        [queryKey]: {
          ...state[queryKey],
          __has_localonly_data: true,
          list: {
            ...state[queryKey].list,
            [state[queryKey].total_count]: action.element,
          },
          total_count: state[queryKey].total_count + 1,
        },
      };

    case 'RECEIVE_QUERY':
      queryKey = JSON.stringify(action.query);

      let newQueryBase = {
        query: action.query,
        total_count: action.meta.total_count,
        __is_loading: false,
        __failed_to_load: false,
        __did_invalidate: false,
        __last_updated: new Date().getTime()
      };

      if (!state[queryKey] ||                   // The query did not exist in the state yet
          !state[queryKey].list ||              // It was a placeholder without any data
          state[queryKey].__did_invalidate) {   // Its data was invalidated
        // Start the list from a clean slate
        return {
          ...state,
          [queryKey]: {
            ...newQueryBase,
            list: action.list.reduce((acc, item, index, array) => {
              return {
                ...acc,
                [index + action.meta.offset]: item,
              };
            }, {}),
            offset: action.meta.offset,
          },
        };
      }
      else {
        // Merge the incoming list with our existing one
        // Keep track of overlap so we know if our global is valid or not
        let duplicates: Array<string> = [];
        // Create an array of the items we already have to easily find duplicates
        let currentListAsArray = Object.keys(state[queryKey].list).map((key) => {
          return state[queryKey as string].list[key];
        });
        // Update our existing list with the one we just received
        let list = {
          ...state[queryKey].list,
          ...action.list.reduce((acc, item, index, array) => {
            if (currentListAsArray.indexOf(item) !== -1) { duplicates.push(item); }
            // Assign the uris at hard indexes on an object
            return {
              ...acc,
              [index + action.meta.offset]: item,
            };
          }, {}),
        };

        return {
          ...state,
          [queryKey]: {
            ...newQueryBase,
            __did_invalidate: !!duplicates.length,
            list,
            offset: typeof state[queryKey].offset === 'number' ?
              // Set the offset as the smallest one from the two lists we just merged
              Math.min(action.meta.offset, state[queryKey].offset) : action.meta.offset,
          },
        };
      }

    case 'START_LOADING_QUERY':
      queryKey = JSON.stringify(action.query);
      return {
        ...state,
        [queryKey]: {
          ...state[queryKey],
          __failed_to_load: false,
          __is_loading: true,
        },
      };

    default:
      return state;
  }
};
