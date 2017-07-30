import { IConnectors } from './interfaces/IConnectors';
import { IModel } from './interfaces/IModel';
import { IReduxState } from './interfaces/IReduxState';
import { IReduxGlobalStore, IReduxLocalStore } from './interfaces/IReduxStore';
import { IResource } from './interfaces/IResource';
import * as _ from 'lodash';
import 'rxjs/add/operator/publishReplay';

import action from './resourceMethods/action';
import delete_ from './resourceMethods/delete';
import get from './modelMethods/get';
import getLocalUuid from './utils/getLocalUuid';
import getOrCreate from './modelMethods/getOrCreate';
import idMapActions from './actionCreators/idMap';
import query from './modelMethods/query';
import reducers from './reducers';
import reload from './resourceMethods/reload';
import save from './resourceMethods/save';
import schema from './modelMethods/schema';
import update from './resourceMethods/update';

let pathToReducer = '';

function initReducer (pathToReducer_: string) {
  if (!_.isString(pathToReducer_)) {
    throw new Error('modelresource.initReducer must be called with the path to the modelresource reducer.');
  }

  pathToReducer = pathToReducer_;
  return reducers;
}

function factory ({ baseUrl, connectors, makeUri, store }: {
  baseUrl: string;
  connectors: IConnectors;
  makeUri: { (model: string, id: string): string };
  store: IReduxGlobalStore;
}) {
  if (!_.isString(pathToReducer)) {
    throw new Error('modelresource.initReducer must be called before attempting to use modelresource.factory.');
  }

  function ModelResource (
    this: IModel,
    { idName, modelName }: {
      idName: string;
      modelName: string;
    }) {

      function Resource (props: { [key: string]: any }) {
        _.assign(this, props || {});
      }

      (Resource as any).connectors = connectors;

      (Resource as any).get = get;
      (Resource as any).getOrCreate = getOrCreate;
      (Resource as any).query = query;
      (Resource as any).schema = schema;

      (Resource as any).baseUrl = baseUrl;
      (Resource as any).makeUri = _.partial(makeUri, modelName);
      (Resource as any).makeUrl = (id: string) => {
        return baseUrl + makeUri(modelName, id);
      };

      (Resource as any).meta = { idName, modelName };

      let storeSlice = store.map(state => state[pathToReducer]).publishReplay(1);
      storeSlice.connect();

      (Resource as any).store = _.assign(storeSlice, {
        dispatch: store.dispatch.bind(store),
        getValue: () => {
          return _.get(storeSlice.getSubject(), 'events[0].value') as IReduxState;
        },
      });

      (Resource as any).getOrCreateLocalUuid = (resourceUri: string) => {
        let existingUuid = getLocalUuid(store.getValue()[pathToReducer], resourceUri);
        if (existingUuid) { return existingUuid; }
        else {
          let action = idMapActions.createLocalWithRemote(resourceUri);
          store.dispatch(action);
          return action.local;
        }
      };

      _.assign(Resource.prototype, { action, delete: delete_, reload, save, update });
      return Resource;
    }
    
  return ModelResource;
}

export { factory, initReducer };
