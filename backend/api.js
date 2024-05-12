const fs = require("fs");

const API_KEY = process.env.RAWG_API_KEY;
const URL = "https://api.rawg.io/api/games";

// Function for fetching data in specific page; max avaliable per page/call is 40
function fetchData(page) {
  const params = new URLSearchParams({
    key: API_KEY,
    page: page,
    page_size: 40,
  });
  return fetch(`${URL}?${params}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return filterGameData(data); // Calling another function to filter data
    });
}

// Function to filter received data, update for other variables
function filterGameData(data) {
  const filteredData = data.results.map((game) => ({
    rawg_id: game.id,
    game_name: game.name,
    game_background_image: game.background_image,
    game_genres: game.genres.map((genre) => genre.name),
    game_released: game.released,
    game_tags: game.tags.map((tag) => tag.name),
    game_rating: game.rating,
    game_ratings_count: game.ratings_count,
    game_platforms: game.parent_platforms.map(
      (parent_platform) => parent_platform.platform.name
    ),
    game_esrb: game.esrb_rating ? game.esrb_rating.name : null,
  }));
  return { results: filteredData };
}

//Function for getting multiple pages of data
function fetchAllData(page, totalPages) {
  const allData = [];
  function fetchDataRecursively(page) {
    //Iterate until all pages are appended
    if (page > totalPages) {
      return allData;
    }
    return fetchData(page)
      .then((data) => {
        allData.push(data.results);
        return fetchDataRecursively(page + 1);
      })
      .catch((error) => {
        throw new Error(
          `Error fetching data for page ${page}: ${error.message}`
        );
      });
  }
  return fetchDataRecursively(page);
}

module.exports = { fetchData, filterGameData, fetchAllData };
