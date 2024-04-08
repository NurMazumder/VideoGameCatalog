# VideoGameCatalog Architecture

This document describes the overall architecture of the VideoGameCatalog Application.

## Highlevel Component Digram

![Component Diagram](component.png)

The client sode of the application uses react and vite, it communicates with the middleware. The middleware recieves request from the frontend and process the request to the backend server. The backend uses node.js and express, it communicates with the middleware, mongo database server, and external API. We also use JWT token's for authenticating Users.
