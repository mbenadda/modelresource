import { IConnectors } from './interfaces/IConnectors';
import { IModel } from './interfaces/IModel';
import { IReduxState } from './interfaces/IReduxState';
import { IReduxStore } from './interfaces/IReduxStore';
import { IResource } from './interfaces/IResource';

import action from './resourceMethods/action';
import delete_ from './resourceMethods/delete';
import get from './modelMethods/get';
import getLocalUuid from './utils/getLocalUuid';
import getOrCreate from './modelMethods/getOrCreate';
import idMapActions from './actionCreators/idMap';
import query from './modelMethods/query';
import reload from './resourceMethods/reload';
import save from './resourceMethods/save';
import schema from './modelMethods/schema';
import update from './resourceMethods/update';

function modelResourceFactory ({ baseUrl, connectors, makeUri, store }: {
  baseUrl: string;
  connectors: IConnectors;
  makeUri: { (model: string, id: string): string };
  store: IReduxStore;
}) {

  function ModelResource (
  this: IModel,
  { idName, modelName }: {
    idName: string;
    modelName: string;
  }) {
    this.meta = { idName, modelName };
    this.store = store; // TODO: reserve a slice of the store instead of operating from root

    this.makeUri = makeUri.bind(this, this.meta.modelName);
    this.makeUrl = (id: string) => {
      return this.baseUrl + this.makeUri(id);
    };

    this.connectors = connectors;

    this.get = get;
    this.getOrCreate = getOrCreate;
    this.query = query;
    this.schema = schema;

    this.getOrCreateLocalUuid = (resourceUri: string) => {
      let existingUuid = getLocalUuid(this.store.getValue(), resourceUri);
      if (existingUuid) { return existingUuid; }
      else {
        let action = idMapActions.createLocalWithRemote(resourceUri);
        this.store.dispatch(action);
        return action.local;
      }
    };
  }

  ModelResource.prototype = { action, delete: delete_, reload, save, update };

  return ModelResource;
}

export default modelResourceFactory;
