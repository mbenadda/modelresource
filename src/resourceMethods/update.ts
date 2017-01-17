import { IResource } from '../interfaces/IResource';
import getResourceByLocal from '../utils/getResourceByLocal';
import resourcesActions from '../actionCreators/resources';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

export default function update (this: IResource, props: { [propName: string]: any }, options?: { localOnly?: boolean }) {
  let Model = this.constructor;
  var observable;

  if (!this.resource_uri || (options && options.localOnly)) {
    Model.store.dispatch(resourcesActions.updateLocally(this, props));
    // We want to maintain the same API if we update locally: 'of' lets us push just ONCE the
    // relevant slice of the current state, which is analogous to what the other resource methods push.
    return Observable.of(getResourceByLocal(Model.store.getValue(), this.__local_uuid));
  }
  else {
    // Instantiate a lightweight copy using only the object's properties and removing our homegrown __ props,
    // and apply the updated props onto it
    let copy = new Model({
      ...Object.keys(this).reduce((acc, key, index, array) => {
        return key.indexOf('__') !== 0 ? { ...acc, [key]: this[key] } : acc;
      }, {}),
      ...props
    });

    // Keep the old props around before we attempt the update so we can revert them easily
    let revertProps = Object.keys(props).reduce((acc, key, index, array) => {
      return { ...acc, key: this[key] };
    }, {});

    Model.store.dispatch(resourcesActions.update(this, props));

    return Model.connectors.put(Model.makeUrl(this[Model.meta.idName]), copy)
      .do((updatedResource) => {
        Model.store.dispatch(resourcesActions.receive(new Model(updatedResource)));
      }, (error) => {
        Model.store.dispatch(resourcesActions.failToUpdate(copy, error, revertProps));
      });
  }
};
