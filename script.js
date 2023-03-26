const inputName = document.getElementById("name");
const btnCreate = document.getElementById("btn-create");
const title = document.getElementById("title");
const form = document.getElementById("form");
const containerModal = document.getElementById("container-modal");
const modal = document.getElementById("modal");
const game = document.getElementById("game");
const pCurrentPlayer = document.getElementById("currentPlayer");
const containerSpaces = document.getElementById("container-spaces");

let winn = false;
let state = "form";

let players = [];
let currentPlayer;
let currentPlayerSimbol;

const initialspaces = [
  {
    id: "a1",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "a2",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "a3",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "b1",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "b2",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "b3",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "c1",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "c2",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
  {
    id: "c3",
    isFilled: false,
    filledWith: "",
    isWinn: false,
  },
];

let spaces = initialspaces.map((space) => {
  return {
    id: space.id,
    isFilled: space.isFilled,
    filledWith: space.filledWith,
    isWinn: space.isWinn,
  };
});

function renderSpaces() {
  containerSpaces.innerHTML = "";
  spaces.map((space) => {
    const btn = `<button class="space ${space.isWinn ? "isWinn" : ""}" id="${
      space.id
    }" onClick="onSpaceClick(${space.id})">${space.filledWith}</button>`;
    containerSpaces.insertAdjacentHTML("afterbegin", btn);
  });
}

function hiddenAllState() {
  form.classList.add("hidden");
  containerModal.classList.add("hidden");
  game.classList.add("hidden");
}
function showCurrentState(state) {
  hiddenAllState();
  if (state === "form") form.classList.remove("hidden");
  if (state === "modal") containerModal.classList.remove("hidden");
  if (state === "game") game.classList.remove("hidden");
}
showCurrentState(state);

function changeCurrentPlayer() {
  pCurrentPlayer.innerHTML = players[currentPlayer];
}

function selectSimbol(id) {
  document.getElementById("x").classList.remove("selected");
  document.getElementById("o").classList.remove("selected");

  const currentBtn = document.getElementById(id);
  currentBtn.classList.add("selected");
  currentPlayerSimbol = id;
}

function stepSelecSimbol() {
  changeCurrentPlayer();
  state = "modal";
  modal.innerHTML = "";
  const p = `<p>Escolha seu simbolo</p> <div class="container-simbol"><button id="x" onClick="selectSimbol(this.id)" class="space simbol">X</button><button id="o" onClick="selectSimbol(this.id)" class="space simbol">O</button></div> <button class="button" onClick="showCurrentState('game')">Começar</button>`;
  modal.insertAdjacentHTML("afterbegin", p);
}

function verifyWin(simbol) {
  if (
    spaces[0].filledWith === simbol &&
    spaces[1].filledWith === simbol &&
    spaces[2].filledWith === simbol
  ) {
    winn = true;
    spaces[0].isWinn = true;
    spaces[1].isWinn = true;
    spaces[2].isWinn = true;
  }
  if (
    spaces[3].filledWith === simbol &&
    spaces[4].filledWith === simbol &&
    spaces[5].filledWith === simbol
  ) {
    winn = true;
    spaces[3].isWinn = true;
    spaces[4].isWinn = true;
    spaces[5].isWinn = true;
  }
  if (
    spaces[6].filledWith === simbol &&
    spaces[7].filledWith === simbol &&
    spaces[8].filledWith === simbol
  ) {
    winn = true;
    spaces[6].isWinn = true;
    spaces[7].isWinn = true;
    spaces[8].isWinn = true;
  }
  if (
    spaces[0].filledWith === simbol &&
    spaces[3].filledWith === simbol &&
    spaces[6].filledWith === simbol
  ) {
    winn = true;
    spaces[0].isWinn = true;
    spaces[3].isWinn = true;
    spaces[6].isWinn = true;
  }
  if (
    spaces[1].filledWith === simbol &&
    spaces[4].filledWith === simbol &&
    spaces[7].filledWith === simbol
  ) {
    winn = true;
    spaces[1].isWinn = true;
    spaces[4].isWinn = true;
    spaces[7].isWinn = true;
  }
  if (
    spaces[2].filledWith === simbol &&
    spaces[5].filledWith === simbol &&
    spaces[8].filledWith === simbol
  ) {
    winn = true;
    spaces[2].isWinn = true;
    spaces[5].isWinn = true;
    spaces[8].isWinn = true;
  }
  if (
    spaces[0].filledWith === simbol &&
    spaces[4].filledWith === simbol &&
    spaces[8].filledWith === simbol
  ) {
    winn = true;
    spaces[0].isWinn = true;
    spaces[4].isWinn = true;
    spaces[8].isWinn = true;
  }
  if (
    spaces[2].filledWith === simbol &&
    spaces[4].filledWith === simbol &&
    spaces[6].filledWith === simbol
  ) {
    winn = true;
    spaces[2].isWinn = true;
    spaces[4].isWinn = true;
    spaces[6].isWinn = true;
  }
}
function restartGame() {
  winn = false;
  spaces = initialspaces.map((space) => {
    return {
      id: space.id,
      isFilled: space.isFilled,
      filledWith: space.filledWith,
      isWinn: space.isWinn,
    };
  });

  state = "game";
  showCurrentState(state);
  renderSpaces();
}

function stepCreatePlayers() {
  players = [];
  currentPlayer = undefined;
  currentPlayerSimbol = "";
  winn = false;
  spaces = initialspaces.map((space) => {
    return {
      id: space.id,
      isFilled: space.isFilled,
      filledWith: space.filledWith,
      isWinn: space.isWinn,
    };
  });

  title.innerHTML = "Player 1";
  inputName.value = "";

  state = "form";
  showCurrentState(state);
  renderSpaces();
}

function onSpaceClick(id) {
  const index = spaces.findIndex((space) => space.id === id.id);

  if (spaces[index].isFilled === true) {
  } else {
    if (!winn) {
      spaces[index].filledWith = currentPlayerSimbol;
      spaces[index].isFilled = true;

      verifyWin(currentPlayerSimbol);

      if (!winn) {
        if (currentPlayer === 0) {
          currentPlayer = 1;
        } else currentPlayer = 0;

        if (currentPlayerSimbol === "x") {
          currentPlayerSimbol = "o";
        } else currentPlayerSimbol = "x";
        changeCurrentPlayer();
      } else {
        setTimeout(() => {
          containerModal.classList.remove("hidden");
          modal.innerHTML = "";
          const p = `<svg width="83" height="42" viewBox="0 0 83 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M51.953 7.62852L45.1521 6.64013L42.1119 0.476735C42.0289 0.307985 41.8923 0.171377 41.7235 0.0883417C41.3003 -0.120587 40.786 0.0535203 40.5744 0.476735L37.5342 6.64013L30.7334 7.62852C30.5459 7.65531 30.3744 7.7437 30.2432 7.87763C30.0845 8.04072 29.9971 8.26013 30.0001 8.48765C30.0031 8.71517 30.0963 8.93219 30.2592 9.09102L35.1798 13.8883L34.0173 20.6624C33.99 20.82 34.0075 20.9821 34.0676 21.1303C34.1278 21.2784 34.2282 21.4068 34.3576 21.5008C34.487 21.5948 34.6402 21.6506 34.7997 21.662C34.9592 21.6733 35.1187 21.6398 35.2601 21.5651L41.3432 18.3669L47.4262 21.5651C47.5923 21.6535 47.7851 21.683 47.97 21.6508C48.436 21.5705 48.7494 21.1285 48.6691 20.6624L47.5066 13.8883L52.4271 9.09102C52.561 8.95977 52.6494 8.78834 52.6762 8.60084C52.7485 8.13209 52.4217 7.69816 51.953 7.62852Z" fill="#DCDE53"/>
          <path d="M81.953 27.6285L75.1521 26.6401L72.1119 20.4767C72.0289 20.308 71.8923 20.1714 71.7235 20.0883C71.3003 19.8794 70.786 20.0535 70.5744 20.4767L67.5342 26.6401L60.7334 27.6285C60.5459 27.6553 60.3744 27.7437 60.2432 27.8776C60.0845 28.0407 59.9971 28.2601 60.0001 28.4877C60.0031 28.7152 60.0963 28.9322 60.2592 29.091L65.1798 33.8883L64.0173 40.6624C63.99 40.82 64.0075 40.9821 64.0676 41.1303C64.1278 41.2784 64.2282 41.4068 64.3576 41.5008C64.487 41.5948 64.6402 41.6506 64.7997 41.662C64.9592 41.6733 65.1187 41.6398 65.2601 41.5651L71.3432 38.3669L77.4262 41.5651C77.5923 41.6535 77.7851 41.683 77.97 41.6508C78.436 41.5705 78.7494 41.1285 78.6691 40.6624L77.5066 33.8883L82.4271 29.091C82.561 28.9598 82.6494 28.7883 82.6762 28.6008C82.7485 28.1321 82.4217 27.6982 81.953 27.6285Z" fill="#DCDE53"/>
          <path d="M21.953 27.6285L15.1521 26.6401L12.1119 20.4767C12.0289 20.308 11.8923 20.1714 11.7235 20.0883C11.3003 19.8794 10.786 20.0535 10.5744 20.4767L7.53424 26.6401L0.733351 27.6285C0.545851 27.6553 0.374422 27.7437 0.243172 27.8776C0.0844985 28.0407 -0.00293815 28.2601 7.53909e-05 28.4877C0.00308893 28.7152 0.096306 28.9322 0.259244 29.091L5.17978 33.8883L4.01728 40.6624C3.99002 40.82 4.00746 40.9821 4.06762 41.1303C4.12777 41.2784 4.22825 41.4068 4.35764 41.5008C4.48704 41.5948 4.64017 41.6506 4.79969 41.662C4.95921 41.6733 5.11872 41.6398 5.26014 41.5651L11.3432 38.3669L17.4262 41.5651C17.5923 41.6535 17.7851 41.683 17.97 41.6508C18.436 41.5705 18.7494 41.1285 18.6691 40.6624L17.5066 33.8883L22.4271 29.091C22.561 28.9598 22.6494 28.7883 22.6762 28.6008C22.7485 28.1321 22.4217 27.6982 21.953 27.6285Z" fill="#DCDE53"/>
          </svg><span>${players[currentPlayer]}</span> <p>winner!!!</p> <button onClick="restartGame()" class="button">Restart game</button><button onClick="stepCreatePlayers()" class="button">Create players</button>`;
          modal.insertAdjacentHTML("afterbegin", p);
        }, 1000);
      }
    } else {
    }
    renderSpaces();
  }
}

inputName.addEventListener("change", (e) => {
  if (e.target.value) {
    btnCreate.removeAttribute("disabled");
  } else {
    btnCreate.disabled = true;
  }
});

btnCreate.addEventListener("click", (e) => {
  e.preventDefault();

  if (!players[0]) {
    players.push(inputName.value);
    title.innerHTML = "Player 2";
    inputName.value = "";
  } else {
    players.push(inputName.value);
    state = "modal";
    showCurrentState(state);

    modal.innerHTML = "";
    const p = `<p>Sorteando primeiro jogador(a)...</p>`;
    modal.insertAdjacentHTML("afterbegin", p);

    let firstPlayer = Math.random() >= 0.45 ? 1 : 0;
    currentPlayer = firstPlayer;
    state = "game";

    setTimeout(() => {
      modal.innerHTML = "";
      const p = `<span>${players[firstPlayer]}</span> <p>start the game!!!</p> <button onClick="stepSelecSimbol()" class="button">Next</button>`;
      modal.insertAdjacentHTML("afterbegin", p);
    }, 1500);
  }
});
renderSpaces();
