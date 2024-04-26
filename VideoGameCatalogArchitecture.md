![image](https://github.com/Minle2002/VideoGameCatalog/assets/124323682/027b7518-d205-404a-aa1b-76a99bea3a67)


Above is the high-level component diagram I made for my group's application, the videogame catalog. Starting from left to right, we first have our deployed website. As we will deploy from vercel, our web client would be directly connected to it, our web-server. Next is our app-server which is built upon react js using the vite build. It is connected to vercel as it is our app that is directly deployed into vercel's server. With our app-server is our mongodb which contains our user data as well as videogame datas. In addition to mongodb is the api we use to fetch data from, rawg api. 

![image](https://github.com/Minle2002/VidoGameCatalog/assets/124323682/5bf2ac35-f37c-45ff-8651-b65d3e7a2d5a)

Above is the entity relationship diagram I made for my group's database. There are three tables I made which the first is the user table. This table features the standard details but will also include a wishlist tab for users that wants to save to it. The review table pulls from the userid to keep track who wrote which reviews. The videogames table is also separate but its gameid is pulled to keep track of games. 

![image](https://github.com/Minle2002/Wishlist/assets/124323682/61757319-c9de-48c6-8b09-9c6e45eccf9a)

Above is a sequence diagram I made for adding a new game to the wishlist page. To start the user needs to be on the videogames page and click on a game card. With the game card, the user can press the add to wishlist button in which the website will request for user data and current game data to add that game data to the user. When added to user, the game will then show up on user end. 
