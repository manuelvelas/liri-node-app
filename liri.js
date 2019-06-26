require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



inquirer.prompt([

    {
      type: "input",
      name: "userInput",
      message: "\n What would you like me to do? please type concert-this to find information"
                +" about a concert, or spotify-this-song to find information about a song, or movie-this"
                + " to find information about movies or just type do-what-it-says\n",

    }
  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(answers) {
  
   //check if the command for spotify
  
    //if user type spotify-this-song program ask him for the song that he is looking for
    if(answers.userInput === "spotify-this-song"){
    
        inquirer.prompt([
            {
                type: "input",
                name: "userChoice",
                message: "what song would you like me to search for you?"
    
            }
        
        ]).then(function(answers) {
        spotify
        .search({ type: 'track', query: answers.userChoice, limit: 1})
        .then(function(response) {

        //   console.log(response.tracks.items[0]);
        console.log("The Name of the Artist is: "+ response.tracks.items[0].artists[0].name );
    
        console.log( "The Name of the Album is: "+response.tracks.items[0].album.name )
        console.log("The Preview Link: "+ response.tracks.items[0].preview_url);

        console.log( "The name of the song is: "+response.tracks.items[0].name);
    
        

        }).catch(function(err) {
        console.log(err);
       
        });
        });
        }else if(answers.userInput === "movie-this"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "userChoice",
                    message: "which movie would you like me search for you?"
        
                }
            
            ]).then(function(answers) {
                
                
            // Run the axios.get function...
            // The axios.get function takes in a URL and returns a promise (just like $.ajax)
            //holds the user choice 
            var movie = answers.userChoice;
            axios
            .get("http://www.omdbapi.com/?apikey=trilogy&t="+movie)
            .then(function(response) {
                //                 Title of the movie.
                // * Year the movie came out.
                // * IMDB Rating of the movie.
                // * Rotten Tomatoes Rating of the movie.
                // * Country where the movie was produced.
                // * Language of the movie.
                // * Plot of the movie.
                // * Actors in the movie.
                // If the axios was successful...
                // Then log the body from the site!
                var rd = response.data;
              
                console.log(rd.Title);
                console.log(rd.Year);
                console.log(rd.Rated);
                console.log(rd.Ratings[1]);
                console.log(rd.Country);
                console.log(rd.Language);
                console.log(rd.Plot);
                console.log(rd.Actors);

                
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log(error.config);
            });
            });
            
                
        }else if(answers.userInput === "concert-this"){
            inquirer.prompt([
                {
                    type: "input",
                    name: "userChose",
                    message: "Please type the artist/band name you looking for"
        
                }
            
            ]).then(function(answers) {
                

            // Run the axios.get function...
            // The axios.get function takes in a URL and returns a promise (just like $.ajax)
            //holds the user choice 
            var band = answers.userChose;
            axios
            .get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
            .then(function(response) {
               
                var rd = response.data[0];
                
                // console.log(rd.venue.datatime);
                // Name of the venue

                // Venue location

                // Date of the Event (use moment to format this as "MM/DD/YYYY")   
                
                console.log("The Name of the venue is: "+rd.venue.name);
                console.log("The location of the event is: "+rd.venue.city);

                var eventday = moment(rd.datetime).format("MM/DD/YYYY");

                
                console.log("The event is on "+eventday);
                
               

                
            })
            .catch(function(error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
                console.log(error.config);
            });

            });

        }else if(answers.userInput === "do-what-it-says"){
            fs.readFile("random.txt", "utf8", function(error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                  return console.log(error);
                }
              
                // We will then print the contents of data
                console.log(data);
                var first = data;
                spotify
                .search({ type: 'track', query: data, limit: 1})
                .then(function(response) {

                //   console.log(response.tracks.items[0]);
                console.log("The Name of the Artist is: "+ response.tracks.items[0].artists[0].name );
            
                console.log( "The Name of the Album is: "+response.tracks.items[0].album.name )
                console.log("The Preview Link: "+ response.tracks.items[0].preview_url);

                console.log( "The name of the song is: "+response.tracks.items[0].name);
            
                

                }).catch(function(err) {
                console.log(err);
            
        });
              
               
              
                
              
        });
           

        }
        });
    
      
  
    
    
    