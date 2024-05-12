// set the players data container
if (!localStorage.getItem("playersData")) {
  localStorage.setItem("playersData", "[]")
}
// start controls 

let newGameButton = document.getElementById("new-game");
let chooseGameButton = document.getElementById("choose-game");
let settingButton = document.getElementById("setting");

let startPage = document.getElementById("start-page");
let newGamePage = document.getElementById("new-game-page")
let chooseGamePage = document.getElementById("choose-game-page");

newGameButton.addEventListener("click", _ => {
  startPage.style.display = "none"
  newGamePage.style.display = "block"
});

chooseGameButton.addEventListener("click", _ => {
  startPage.style.display = "none"
  chooseGamePage.style.display = "block";
  // show the played games 
  showData()

});
// end start controls


//start new game page
//players data 
let playersData = {
  id: "",
  players: {
    "player-1": {
      name: "",
      color: "",
      icone: "x",
      winning: 0,
      tie: 0,
      losing: 0
    },
    "player-2": {
      name: "",
      color: "",
      icone: "o",
      winning: 0,
      tie: 0,
      losing: 0
    }
  },
  date: ""
};


let playerMainColor = document.documentElement;
let playersNames = document.querySelectorAll(".name input");
let startButton = document.querySelector(".new-game-controls .start");
let mainGame = document.querySelector(".main-game");
let backButtonNewGame = document.querySelector(".new-game-controls .back");

//player 1
let playerOneName = document.querySelector(".name input#name-1");
let playerOneIcon = document.querySelector(".player-1 .icon");
let playerOneColor = document.querySelector(".player-1 .colors .active");
let xoPlayerOne = document.querySelector(".player-1 .x-or-o .active");
let chooseColorsOne = document.querySelectorAll(".player-1 .colors > li");
let chooseXOIconOne = document.querySelectorAll(".player-1 .x-or-o >*")
// choosing color
chooseColor(chooseColorsOne, "one")
//choose X or O 
//choseXO(chooseXOIconOne);

// player 2

let playerTwoName = document.querySelector(".name input#name-2");
let playerTwoIcon = document.querySelector(".player-2 .icon");
let playerTwoColor = document.querySelector(".player-2 .colors .active");
let xoPlayerTwo = document.querySelector(".player-2 .x-or-o .active");
let chooseColorsTwo = document.querySelectorAll(".player-2 .colors > li");
let chooseXOIconTwo = document.querySelectorAll(".player-2 .x-or-o >*")

//choosing color
chooseColor(chooseColorsTwo, "two")
// choose X or O 
//choseXO(chooseXOIconTwo);
// name error
let errorName = document.createElement("span");
errorName.innerHTML = "Can't be empty !"
// cleaning name error 
playersNames.forEach(inputName => {
  inputName.onfocus = _ => {
    cleanError()
  }
})
// click to start button and start the game 
startButton.onclick = _ => {
  // check and get data
  // get the name
  let nameOne = playerOneName.value.trim();
  let nameTwo = playerTwoName.value.trim();
  var colorOne = window.getComputedStyle(playerMainColor).getPropertyValue("--color-player-one");
  var colorTwo = window.getComputedStyle(playerMainColor).getPropertyValue("--color-player-two");

  if (!nameOne) {
    playerOneName.classList.add("error");
    playerOneName.parentElement.appendChild(errorName)

  }
  else if (!nameTwo) {
    playerTwoName.classList.add("error");
    playerTwoName.parentElement.appendChild(errorName);
  }
  else {
    //get date
    let date = new Date()
    let dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // set the players data
    playersData["id"] = Date.now();
    playersData["players"]["player-1"].name = nameOne;
    playersData["players"]["player-1"].color = colorOne;
    playersData["players"]["player-2"].name = nameTwo;
    playersData["players"]["player-2"].color = colorTwo;
    playersData["date"] = dateFormat;
    // set the data and storage
    setGetData("set", playersData);

    //hidden the new game page
    newGamePage.style.display = "none";
    //show the main game
    mainGame.style.display = "block";
    gameNameOne.innerHTML = `Player-1: ${nameOne}`;
    gameNameTwo.innerHTML = `Player-2: ${nameTwo}`;
  }

}
//back to the start page
backButtonNewGame.onclick = _ => {
  //clean error
  cleanError();
  // rest the page newGame
  newGamePageRest()
  // clean the data
  playersData = cleanPlayersData()
  // hidden the new game page
  newGamePage.style.display = "none";
  // show the start page
  startPage.style.display = "flex"
}

// functions
// 
function chooseColor(colors, mainColor) {
  colors.forEach(function(color) {
    color.addEventListener("click", function() {
      var colorOne = window.getComputedStyle(playerMainColor).getPropertyValue("--color-player-one");
      var colorTwo = window.getComputedStyle(playerMainColor).getPropertyValue("--color-player-two");

      if (mainColor === "one") {
        if (color.dataset.color != colorTwo) {

          colors.forEach(el => {
            el.classList.remove("active");
          });
          // add active class to the selected color
          color.classList.add("active");
          // change the color of XO that actuve
          playerMainColor.style.setProperty("--color-player-" + mainColor, color.dataset.color);
        }
      }
      else if (mainColor === "two") {
        if (color.dataset.color != colorOne) {
          colors.forEach(el => {
            el.classList.remove("active");
          });
          // add active class to the selected color
          color.classList.add("active");
          // change the color of XO that actuve
          playerMainColor.style.setProperty("--color-player-" + mainColor, color.dataset.color);
        }
      }
    });
  });
}
// checking classes
function checkCS(element, className) {
  if (element.classList.contains(className)) {
    return true
  }
  else {
    return false
  }
}
// cleaning players data
function cleanPlayersData() {
  data = {
    id: "",
    players: {
      "player-1": {
        name: "",
        color: "",
        icone: "x",
        winning: 0,
        tie: 0,
        losing: 0
      },
      "player-2": {
        name: "",
        color: "",
        icone: "o",
        winning: 0,
        tie: 0,
        losing: 0
      }
    },
    date: ""
  };
  return data
}

function cleanError() {
  // cleaning name error 
  playersNames.forEach(inputName => {
    if (checkCS(inputName, "error")) {
      inputName.parentElement.removeChild(inputName.parentElement.lastChild);
      inputName.classList.remove("error")
    };
  });
};

function newGamePageRest() {
  playersNames.forEach(name => {
    name.value = "";

  });
  chooseColorsOne.forEach(color => {
    color.classList.remove("active")
  })
  chooseColorsOne[0].classList.add("active");
  chooseColorsTwo.forEach(color => {
    color.classList.remove("active")
  })
  chooseColorsTwo[1].classList.add("active");
  playerMainColor.style.setProperty("--color-player-one", "#26A2FF");
  playerMainColor.style.setProperty("--color-player-two", "#FF2688");
}

/*function choseXO (element){
  element.forEach(XO => {
    XO.addEventListener("click", _ => {
      element.forEach(xORo => {
        xORo.classList.remove("active");
      })
      XO.classList.add("active")
    })
  })
}*/

function setGetData(setGet, data) {
  if (setGet === "set") {
    var getData = localStorage.getItem("playersData");
    var arrayData = JSON.parse(getData);
    arrayData.push(data);
    // storage the data
    localStorage.setItem("playersData", JSON.stringify(arrayData));
  }
}
//end new game page.
// start the main game
let gamePage = document.querySelector(".main-game .game")
let gameNameOne = document.querySelector(".player-info .player-1 .name");
let gameNameTwo = document.querySelector(".player-info .player-2 .name");
let playerTurnOne = document.querySelector(".player-info .player-1");
let playerTurnTwo = document.querySelector(".player-info .player-2");
let homeButton = document.querySelector(".main-game .home");
let playeAgain = document.querySelector(".main-game .playe-again");
let cols = document.querySelectorAll(".game .col");
let turn = Math.floor(1 + Math.random() * 10);
let clickedColor = ["x", "o"];

// player turns
if (turn % 2 === 0) {
  playerTurnOne.classList.add("turn-x")
}
else {
  playerTurnTwo.classList.add("turn-o")
  clickedColor = clickedColor.reverse();
}
// where the position is
window.addEventListener("touchmove", function(ev) {
  posX = ev.touches[0].pageX;
  posY = ev.touches[0].pageY;
  endElement = document.elementFromPoint(posX, posY);
})

cols.forEach(col => {
  col.addEventListener("touchstart", ev =>
  {
    if (!checkCS(col, "clicked") && !checkCS(gamePage, "finish")) {
      startElement = ev.target;
      endElement = ev.target
      //coloring the target
      col.classList.add(clickedColor[0])
    }

  })
  two = col.addEventListener("touchend", function(ev) {
    if (!checkCS(col, "clicked") && !checkCS(gamePage, "finish")) {

      // if the touching still in the smae place
      if (startElement === endElement) {
        // make it clicked and coloring it
        col.classList.add("clicked", "active-" + clickedColor[0])
        // change the player turns
        clickedColor = clickedColor.reverse()
        playerTurnOne.classList.toggle("turn-x")
        playerTurnTwo.classList.toggle("turn-o");
        checkWinner(cols);
      }
      else {
        // remove the color of clicking
        col.classList.remove(clickedColor[0])
      }
    }
  });
});

homeButton.onclick = _ => {
  toHome()
};
playeAgain.onclick = _ => {
  mainGameRest()
}

// check winner 
function checkWinner(cols) {
  let rules = [
    [cols[0], cols[1], cols[2]],
    [cols[3], cols[4], cols[5]],
    [cols[6], cols[7], cols[8]],
    //
    [cols[0], cols[3], cols[6]],
    [cols[1], cols[4], cols[7]],
    [cols[2], cols[5], cols[8]],
    //
    [cols[0], cols[4], cols[8]],
    [cols[6], cols[4], cols[2]],
    ];
  // x winner
  if (rules.some(col =>
      col.every(el => checkCS(el, "active-x")))) {
    gamePage.classList.add("finish");
    winnerX.classList.add("active-x");
    endGamePage.style.display = "block";
    updatePlayersData(playersData.id, "x");
    winnerX.innerHTML = `
    <span>Winner</span>
    <p>${xName.toUpperCase()}</p>
    `
    time = Date.now() + 500;
  }
  // o winner
  else if (rules.some(col => col.every(el => checkCS(el, "active-o")))) {
    gamePage.classList.add("finish")
    winnerO.classList.add("active-o");
   
    endGamePage.style.display = "block";
    updatePlayersData(playersData.id, "o");
    winnerO.innerHTML = `
        <span>Winner</span>
        <p>${oName.toUpperCase()}</p>`
    time = Date.now() + 500
  }
  // tie
  else if (rules.every(col => col.every(el => checkCS(el, "clicked")))) {
    gamePage.classList.add("finish");
    tie.classList.add("active");
    endGamePage.style.display = "block";
    updatePlayersData(playersData.id, "tie");
    time = Date.now() + 500
  };
};

function mainGameRest() {
  gamePage.classList.remove("finish");
  cols.forEach(col => {
    col.className = "col"
  })
}

function updatePlayersData(id, winner) {
  let data = JSON.parse(localStorage.getItem("playersData"))
  let date = new Date()
  let dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  data.forEach((el, index) => {
    if (el.id === id) {
      data[index]["date"] = dateFormat;
      if (winner === "x") {
        data[index]["players"]["player-1"]["winning"] += 1;
        data[index]["players"]["player-2"]["losing"] += 1;
      }
      else if (winner === "o") {
        data[index]["players"]["player-2"]["winning"] += 1;
        data[index]["players"]["player-1"]["losing"] += 1;
      }
      else if (winner === "tie") {
        data[index]["players"]["player-2"]["tie"] += 1;
        data[index]["players"]["player-1"]["tie"] += 1;
      }
    };
  });
  localStorage.setItem("playersData", JSON.stringify(data))
}
// end the main game

// start end-game
let time;
let endGamePage = document.querySelector(".game-end")
let winners = document.querySelectorAll(".winner");
let winnerX = document.querySelector(".winner .x-winner");
let winnerO = document.querySelector(".winner .o-winner");
let tie = document.querySelector(".winner .tie");
let endGameHomeButton = document.querySelector(".end-controls .home");
let playAgainButton = document.querySelector(".end-controls .play-again");

endGameHomeButton.onclick = _ => {
  
  if(time <= Date.now()){
    winnerX.className = "x-winner";
    winnerO.className = "o-winner";
    tie.className = "tie";
    endGamePage.style.display = "none";
    toHome()
  }
  
}
playAgainButton.onclick = _ => {
  // main game restart
  if(time <= Date.now()){
  mainGameRest();
  endGamePage.style.display = "none";
  winnerX.className = "x-winner";
  winnerO.className = "o-winner";
  tie.className = "tie";
  }
}
function toHome (){
  mainGame.style.display = "none"
  startPage.style.display = "flex";
  // new game restart
  newGamePageRest();
  // main game restart
  mainGameRest()
}
// end end-game
// start choose game
let chooseGameResultsPage = document.querySelector(".choose-game .container");
let chooseBack = document.querySelector(".choose-game .container > .back");
let noData = document.querySelector(".no-data");
let xName;
let oName;
chooseBack.onclick = _ => {
  chooseGamePage.style.display = "none";
  startPage.style.display = "flex"
}

function showData() {
  if (checkCS(chooseGameResultsPage, "data")) {
    chooseGameResultsPage.classList.remove("data");
    document.querySelectorAll(".played-games").forEach(el => {
      chooseGameResultsPage.removeChild(el);
    })
  }

  // get all the data of players
  let data = JSON.parse(localStorage.getItem("playersData"));
  if (data.length === 0) {
    noData.style.display = "block";
  }

  else {
    chooseGameResultsPage.classList.add("data")
    noData.style.display = "none";
    // add the data 
    data.forEach(function(el) {
      // get the data
      let {
        id,
        players: {
          "player-1": {
            name: nameOne,
            winning: winOne,
            losing: losOne,
            tie: tieOne,
            color: colorOne
          },
          "player-2": {
            name: nameTwo,
            winning: winTwo,
            losing: losTwo,
            tie: tieTwo,
            color: colorTwo
          }
        },
        date
      } = el;

      let result = `
            <div class="color one"></div>
            <div class="name one">${nameOne}</div>
            <div class="span"> V/S </div>
            <div class="name two">${nameTwo}</div>
            <div class="color two"></div>`;
     
      let playedGame = document.createElement("div");
      playedGame.id = id;
      playedGame.classList.add("played-games");
      playedGame.innerHTML = result;
      chooseGameResultsPage.appendChild(playedGame);
      let playerData = document.createElement("div");
      playerData.classList.add("data-players");
      playerData.innerHTML = `<div class="container">
                <div class="icons">
                  <div class="x"></div>
                  <span>V/S</span>
                  <div class="o"></div>
                </div>
                <div class="names">
                  <p class="one">${nameOne}</p>
                  <span>Name</span>
                  <p class="two">${nameTwo}</p>
                </div>
                <div class="winning">
                  <p class="one">${winOne}</p>
                  <span>Winner</span>
                  <p class="two">${winTwo}</p>
                </div>
                <div class="losing">
                  <p class="one">${losOne}</p>
                  <span>Losing</span>
                  <p class="two">${losTwo}</p>
                </div>
                <div class="tie">
                  <p class="one">${tieOne}</p>
                  <span>Tie</span>
                  <p class="two">${tieTwo}</p>
                </div>
                <div class="date">${date}</div>
                <div class="choose-controls">
                  <button class="back">
                   <i class="back fa-solid fa-arrow-left"></i>
                  </button>
                  <button class="play">
                    Play
                  </button>
                </div>
              </div>`;
      let colOne = playedGame.querySelector(".color.one");
      let colTwo = playedGame.querySelector(".color.two");
      let iconOne = playerData.querySelector(".icons .x");
      let iconTwo = playerData.querySelector(".icons .o");
      iconOne.style.backgroundColor = colorOne;
      iconTwo.style.backgroundColor = colorTwo;
      colOne.style.backgroundColor = colorOne;
      colTwo.style.backgroundColor = colorTwo;
      
      playedGame.addEventListener("click", ev => {
         if(checkCS(ev.target, "back")){
           // remove the data plaed box
           playerData.remove()
         }
         else if (checkCS(ev.target,"play")){
           choosingGame(el)
         }
         else{
           // add the data played box
           playedGame.appendChild(playerData);
         }
      })

    });

  }
}
function choosingGame (data){
  let {
        id,
        players: {
          "player-1": {
            name: nameOne,
            winning: winOne,
            losing: losOne,
            tie: tieOne,
            color: colorOne
          },
          "player-2": {
            name: nameTwo,
            winning: winTwo,
            losing: losTwo,
            tie: tieTwo,
            color: colorTwo
          }
        },
        date
      } = data;
  playersData.id = id
  // change the color of XO that actuve
  playerMainColor.style.setProperty("--color-player-one", colorOne);
  playerMainColor.style.setProperty("--color-player-two", colorTwo);
  chooseGamePage.style.display = "none";
  mainGame.style.display = "block";
  gameNameOne.innerHTML = `Player-1: ${nameOne}`;
  xName = nameOne;
  gameNameTwo.innerHTML = `Player-2: ${nameTwo}`;
  oName = nameTwo
}
// end end-game