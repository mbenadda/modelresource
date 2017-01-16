import { IConnectors } from './IConnectors';
import { IReduxStore } from './IReduxStore';
import { IResource } from './IResource';
import { Observable } from 'rxjs/Observable';

export interface IModel {
  new(props: { [propName: string]: any }): IResource;
  baseUrl: string;
  connectors: IConnectors;
  get: Function;
  getOrCreate: Function;
  getOrCreateLocalUuid: { (resourceUri: string): string };
  makeUri: { (id: string): string };
  makeUrl: { (id: string): string };
  meta: {
    idName: string;
    modelName: string;
  };
  query: Function;
  schema: Function;
  schemaCache?: Observable<any>; 
  store: IReduxStore;
};
