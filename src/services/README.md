# Services

Any services that interface with the outside world will live here (think REST APIs, Error Report, Analytics, etc.).

## Common / HTTP Client

This folder contains an abstract definition to create Http clients (like REST APIs). It uses `Axios` internally to make requests. Also, includes an `error-handler` with some generic errors definitions and messages.

## API

By default, just a basic HTTP client service (api) is included in the boilerplate. It extends from the above HTTP client.

## Error Report

It is just very basic implementation of an error report client. It sends the error to the console.
