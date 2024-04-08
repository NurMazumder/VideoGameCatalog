# VideoGameCatalog Architecture

This document describes the overall architecture of the VideoGameCatalog Application.

## Highlevel Component Digram

![Component Diagram](component.png)

The client side of the application uses react and vite, it communicates with the middleware. The middleware recieves request from the frontend and process the request to the backend server. The backend uses node.js and express, it communicates with the middleware, mongo database server, and external API. We also use JWT token's for authenticating Users.

## Relationship Diagram

![Relationship Diagram](ERD.png)

## Flow Diagram

![Flow Diagram](flow.png)

A user initiates the process by accessing the website, which then prompts for login credentials. Upon submission, these credentials are validated against the database through the server. If authenticated successfully, the server requests a JWT token from the JWT Service, which generates and returns a token encapsulating user information. This token is then sent back to the user alongside authentication confirmation. For future authenticated requests, the user includes this JWT token, which the server validates with the JWT Service to ensure its authenticity. Upon validation, the server authorizes the request, allowing the website to display the requested data to the user.
