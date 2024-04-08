## Video Game Catalog ##

**High Level Component Diagram**
![High Level Component Diagram](https://raw.githubusercontent.com/KevinZheng0701/VideoGameCatalog/main/HighLevelComponentDiagram.png)

Our web application comprises a frontend built with React using Vite, which utilizes HTML, CSS, and JavaScript. Users interact with the application, performing actions like adding games to their wishlist. When such actions are initiated, a HTTPS request is sent to the middleware component. This middleware is responsible for handling the interaction between the frontend and backend. It handles the process of fetching game data from the RAWG API, which is then processed and managed in the backend which is implemented using Node.Js with Express. Finally, the relevant information is stored in our mongo database for future retrieval and utilization within the application.

**Entity Relationship Diagram**
![Entity Relationship Diagram](https://raw.githubusercontent.com/KevinZheng0701/VideoGameCatalog/main/EntityRelationDiagram.png)

Here the main entities are users, reviews, games, platforms, tags, and genres. Additionally there are four tables which I’ve used as a joint table to indicate many-to-many relationships. A user can write many reviews in which each review belongs to one game. A user has the capacity to compose numerous reviews, with each review linked to a single game. Furthermore, a user can populate their wishlist with multiple games. This establishes a many-to-many relationship where each game may be present on the wishlists of multiple users, facilitated by a joint table for better clarity. Note that although the diagram does not explicitly depict a wishlist table, the concept of game ownership or desire to get games was done through the joint table referencing users and games. Similarly, games can be associated with genres, platforms, and tags. Given that a game may possess one or multiple attributes, and each attribute can be affiliated with multiple games, these relationships are also characterized by many-to-many relationships with the use of join tables for representation. Each table incorporates crucial attributes such as ID, name, foreign keys, and others that may be stored in the database.

**Sequence Diagram**
![Sequence Diagram](https://raw.githubusercontent.com/KevinZheng0701/VideoGameCatalog/main/SequenceDiagram.png)
Here the sequence diagram is showing the interactions of a user viewing and then writing a review to a particular game. A user can first click on a game card which will lead them to the game page. The click to that game will now fetch the game data from the database with relevant information like an image url, genres, platforms, title, description, etc. The fetch will return the game data if it is successful, else it will give an error. Once the game page receives the data, it will showcase it to the user. Then the user will be able to write a review and give a rating and once the user submits the form, then the game page will add the details of the review to the review database. The database will return the result of the adding, success or error if some problem arises. Depending on the result, the game page will update the page with the updated result of adding the review. The user can now see their review on the page.