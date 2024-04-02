const fs = require('fs');
const { fetchData, filterGameData, fetchAllData } = require('./api');

function convertToJson(page, totalPages) {
    try {
        fetchAllData(page, totalPages)
            .then(data => {
                const flattenedData = data.flat();
                const jsonString = JSON.stringify(flattenedData);
                fs.writeFileSync('gamesListed.json', jsonString, 'utf8');
                console.log('JSON file created successfully');
            })
            .catch(error => {
                console.error('Error occurred while fetching data:', error);
            });
    } catch (error) {
        console.error('Error occurred while converting to JSON:', error);
    }
}
//Generating a JSON file for 1-# amount of pages -> 25 for 1000 games
convertToJson(1, 25);
