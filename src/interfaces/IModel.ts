import { IReduxStore } from './IReduxStore';
import { IResource } from './IResource';

export interface IModel {
  new(props: { [propName: string]: any }): IResource;
  baseUrl: string;
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
  store: IReduxStore;
};
