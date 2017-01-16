import { IModel } from '../interfaces/IModel';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';

// TODO: Impelement a better version of the schema method: this one is not ideal asit does not use the store,
// operates under the assumption that schemas are always available at "model/schema", and mutates the host class.
export default function schema (this: IModel) {
  let schemaCache;
  // If we already have a cache, we don't need to make any calls
  if (!this.schemaCache) {
    // Use the connector to make the actual call for the schema
    schemaCache = this.schemaCache = this.connectors.get(this.makeUrl('schema'))
      .retryWhen((errors) => {
        return errors
          .scan((errorCount, err) => {
            if (errorCount >= 3) { throw err; }
            return errorCount + 1;
          }, 0);
      })
      .do(() => {}, (error) => {
        // Remove the observable in schemaCache so we don't cache a failed attempt
        this.schemaCache = undefined;
      })
      // Cache the response and make sure it will be passed to new subscribers without re-running the sequence
      .publishReplay(1);
    schemaCache.connect();
  }
  return schemaCache || this.schemaCache;
};
