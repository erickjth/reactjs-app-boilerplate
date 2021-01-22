# Stores / State Managment

This is where your app's stores/models will live.
Stores/Models are `mobx-state-tree` model files, which define like actions, views, types, etc.

Also, this directory contains some other utility files to extends stores/models:

## Extensions

-   `with-root-store`: Allow single model to access to the root store.
-   `with-services`: It includes shotcuts to access to the services from the environment.
-   `with-status`: Allows models to have/handle its owns status. [pending, idle, done, error].

## Middlewares

Here will live the definition of [mobx-state-tree`s middlewares](https://mobx-state-tree.js.org/concepts/middleware).

## Models

Defines all single models used in the stores.
