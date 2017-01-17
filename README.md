# ModelResource
Easy-to-use model interaction methods for the client side. Uses a redux store and exposes rxjs-based methods to consumers.

## CAUTION
- May contain bugs although it is a direct TypeScript port of a working angular1/ES5 implementation.
- Presently does not contain any unit or functional test(s).
- Passes TypeScript compilation with --strictNullChecks and --noImplicitAny.

## A few obvious improvements
- Store plain objects so we don't need to instantiate resources to insert them into the store — this would fix an issue we have with the query method which cannot insert resources that belong to another model into the store for now.
- Specify the connectors interfaces using types so they can be a general-purpose tool.
- Extract implementation details into factory parameters or do without them if at all possible.
- Better handle error cases for all the methods.
- Improve the delete method to better manage user expectations and be able to report errors.
- Improve the schema method to use the store instead of mutating the Model.

## Documentation & API
TBD.