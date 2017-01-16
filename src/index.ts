import { IConnectors } from './interfaces/IConnectors';
import { IModel } from './interfaces/IModel';
import { IReduxState } from './interfaces/IReduxState';
import { IReduxStore } from './interfaces/IReduxStore';
import { IResource } from './interfaces/IResource';

import get from './modelMethods/get';
import getLocalUuid from './utils/getLocalUuid';
import idMapActions from './actionCreators/idMap';

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

  return ModelResource;
}

export default modelResourceFactory;
