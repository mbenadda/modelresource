import { IQueryParams } from '../interfaces/IQueryParams';
import omit from 'lodash/omit';

export default (query: IQueryParams) => {
  return omit(query, [ 'limit', 'offset', 'language', 'format', 'forceRequest', 'cleanLoad' ]) as IQueryParams;
}