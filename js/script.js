/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

/*** 
  Array of objects that are game quotes that includes properties 
  such as the quote, author, game, year, and tags
***/

var intervalId;

var gameQuotes = [
  {
    quote: "We all make choices in life, but in the end our choices make us.",
    author: "Andrew Ryan",
    game: "BioShock",
    year: "2007",
    tags: "#fps #rpg"
  },
  {
    quote: "A hero need not speak. When he is gone, the world will speak for him.",
    author: "Master Chief",
    game: "Halo",
    year: "2001",
    tags: "#fps"
  },
  {
    quote: "It's time to kick ass and chew bubblegum... and I'm all outta gum.",
    author: "Duke Nukem",
    game: "Duke Nuke 3D",
    year: "1996",
    tags: "#fps"
  },
  {
    quote: "Don't wish it were easier, wish you were better.",
    author: "Chief",
    game: "Animal Crossing",
    year: "2001",
    tags: "sim"
  },
  {
    quote: "Good men mean well. We just don't always end up doing well.",
    author: "Isaac Clarke",
    game: "Dead Space",
    year: "2008",
    tags: "#rpg #survival"
  },
  {
    quote: "What is a man? A miserable little pile of secrets.",
    author: "Dracula",
    game: "Castlevania: Symphony of the Night",
    year: "1997",
    tags: "rpg"
  },
  {
    quote: "No matter how dark the night, morning always comes, and our journey begins anew.",
    author: "Lulu",
    game: "Final Fantasy X",
    year: "2001",
    tags: "#rpg"
  }
];



/***
  Returns a random quote object from our quote array above.
***/

function getRandomQuote() {
  var randomNumber = Math.floor(Math.random() * gameQuotes.length);
  var randomQuote = gameQuotes[randomNumber];

  return randomQuote;
}

/***
 Returns a string value of randomly picked rgb values between 1-255 
 ***/

function randomColor() {
  var randomRed = Math.floor(Math.random() * 256);
  var randomGreen = Math.floor(Math.random() * 256);
  var randomBlue = Math.floor(Math.random() * 256);

  return 'rgb(' + randomRed + ',' + randomGreen + ',' + randomBlue + ')';
}

/***
  This function is called by our button listener to present a new quote to the screen.
  Uses getRandomQuote function to randomly pick a new quote from our array, then it
  builds the html using the quotes property values. It will test to see if the quote has a game
  name, year and tags before adding it to the new html string. Then it changes the quote-box 
  element to the new html string
***/

function printQuote() {
  var newQuote = getRandomQuote();
  var html = '';

  html += '<p class="quote">' + newQuote.quote + '</p>';
  html += '<p class="source">' + newQuote.author;

  if (newQuote.game) {
    html += '<span class="citation">' + newQuote.game + '</span>';
  }
  if (newQuote.year) {
    html += '<span class="year">' + newQuote.year + '</span>'
  }
  if (newQuote.tags) {
    html += '<span class="tags">' + newQuote.tags + '</span>'
  }
  html += '</p>';

  document.getElementById('quote-box').innerHTML = html;
  document.body.style.backgroundColor = randomColor();
}


// This calls the printQuote function every 20 seconds

intervalId = setInterval(printQuote, 20000);

/***
  When the "Show another quote" button is clicked, the event listener 
  below will be triggered, and it will call, or "invoke", the `printQuote` 
  function.
***/

document.getElementById('loadQuote').addEventListener("click", printQuote, false);