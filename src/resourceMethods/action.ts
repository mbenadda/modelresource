import { IResource } from '../interfaces/IResource';
import resourcesActions from '../actionCreators/resources';
import * as _ from 'lodash';

import 'rxjs/add/operator/do';

export default function action (this: IResource, action: string, payload?: any) {
  let Model = this.constructor;

  Model.store.dispatch(resourcesActions.startAction(this));

  let resource = new Model(_.transform(this, (acc, value, key: string) => {
    if (key.indexOf('__') !== 0) {
      acc[key] = value;
    }
  }))

  return Model.connectors.put(Model.makeUrl(this[Model.meta.idName]) + '/' + action, payload || resource)
    .do((updatedResource) => {
      Model.store.dispatch(resourcesActions.receive(new Model(updatedResource)));
    }, (error) => {
      Model.store.dispatch(resourcesActions.failAction(this, error));
    });
};
