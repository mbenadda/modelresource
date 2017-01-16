import { IQueryParams } from '../interfaces/IQueryParams';
import * as _ from 'lodash';

export default (query: IQueryParams) => {
  return _.omit(query, [ 'limit', 'offset', 'language', 'format', 'forceRequest', 'cleanLoad' ]) as IQueryParams;
}