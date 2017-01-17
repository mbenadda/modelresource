import { IResource } from '../interfaces/IResource';
import resourcesActions from '../actionCreators/resources';

import 'rxjs/add/operator/do';

export default function action (this: IResource, action: string, payload?: any) {
  let Model = this.constructor;

  Model.store.dispatch(resourcesActions.startAction(this));

  return Model.connectors.put(Model.makeUrl(this[Model.meta.idName]) + '/' + action, payload)
    .do((updatedResource) => {
      Model.store.dispatch(resourcesActions.receive(new Model(updatedResource)));
    }, (error) => {
      Model.store.dispatch(resourcesActions.failAction(this, error));
    });
};
