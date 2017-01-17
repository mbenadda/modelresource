import { IResource } from '../interfaces/IResource';
import resourcesActions from '../actionCreators/resources';

export default function delete_ (this: IResource) {
  let Model = this.constructor;

  // TODO: Improve the error case by managing the user's expectations: first a loading state then an effective removal
  // or an error state.
  // For now this action instantly removes the element from the store while we're performing the request.
  Model.store.dispatch(resourcesActions.delete(this));

  return Model.connectors.delete(Model.makeUrl(this[Model.meta.idName]));
};
