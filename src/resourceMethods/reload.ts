import { IResource } from '../interfaces/IResource';
import resourcesActions from '../actionCreators/resources';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

export default function reload (this: IResource) {
  let Model = this.constructor;

  Model.store.dispatch(resourcesActions.invalidate(this));

  return Observable.create((observer: { complete: Function, error: Function, next: Function }) => {
    Model.get({ [Model.meta.idName]: this[Model.meta.idName] })
    .filter((resource: IResource) => { return !resource.__is_loading; })
    .subscribe((resource: IResource) => {
      observer.next(resource);
      observer.complete();
    }, (error: Error) => {
      observer.error(error);
    });
  });
};
