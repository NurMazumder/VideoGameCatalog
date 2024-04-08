![image](https://github.com/Minle2002/Wishlist/assets/124323682/2acd3edb-9057-41b0-b7a5-408cc7dc1e18)

Above is the high-level component diagram I made for my group's application, the videogame catalog. Starting from left to right, we first have our deployed website. As we will deploy from vercel, our web client would be directly connected to it, our web-server. Next is our app-server which is built upon react js using the vite build. It is connected to vercel as it is our app that is directly deployed into vercel's server. With our app-server is our mongodb which contains our user data as well as videogame datas. In addition to mongodb is the api we use to fetch data from, rawg api. 

![image](https://github.com/Minle2002/Wishlist/assets/124323682/5bf2ac35-f37c-45ff-8651-b65d3e7a2d5a)

Above is the entity relationship diagram I made for my group's database. There are three tables I made which the first is the user table. This table features the standard details but will also include a wishlist tab for users that wants to save to it. The review table pulls from the userid to keep track who wrote which reviews. The videogames table is also separate but its gameid is pulled to keep track of games. 
