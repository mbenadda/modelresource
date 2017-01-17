import { IResource } from '../interfaces/IResource';
import resourcesActions from '../actionCreators/resources';

import 'rxjs/add/operator/do';

export default function save (this: IResource) {
  let Model = this.constructor;

  // Instantiate a lightweight copy using only the object's properties and removing our homegrown __ props
  let copy = new Model(Object.keys(this).reduce((acc, key, index, array) => {
    return key.indexOf('__') !== 0 ? { ...acc, [key]: this[key] } : acc;
  }, {}));

  Model.store.dispatch(resourcesActions.startToSave(this));

  return Model.connectors.post(Model.baseUrl + '/' + Model.meta.modelName, copy)
    .do((savedResource) => {
      Model.store.dispatch(resourcesActions.finishSaving(this.__local_uuid, new Model(savedResource)));
    }, (error) => {
      Model.store.dispatch(resourcesActions.failToSave(this, error));
    });
};
