// Shortcut document.getElementById
const $ = (id) => document.getElementById(id);

// Global Variables
let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;
let isSelected = false;

const startGame = () => {
  sectionAvatar.style.display = "block";
  sectionStart.style.display = "none";
};

const selectAvatar = () => {
  const inputSamu = $("samu");
  const inputGary = $("gary");
  const inputTeban = $("teban");
  const spanPlayer = $("player-avatar");
  const popup = $("popup");

  if (inputSamu.checked) {
    spanPlayer.innerHTML = "Samu";
    isSelected = true;
  } else if (inputGary.checked) {
    spanPlayer.innerHTML = "Gary";
    isSelected = true;
  } else if (inputTeban.checked) {
    spanPlayer.innerHTML = "Teban";
    isSelected = true;
  } else {
    popup.classList.add("open-popup");
  }

  if (isSelected) {
    sectionAvatar.style.display = "none";
    sectionAttacks.style.display = "block";
    selectEnemy();
  }
};

const selectEnemy = () => {
  randomEnemyOptions = ["Evil Samu", "Evil Gary", "Evil Teban"];
  let randomEnemy = randomEnemyOptions[random(0, 2)];
  let spanEnemy = $("enemy-avatar");
  spanEnemy.innerHTML = randomEnemy;
};

const attacks = (attack) => {
  switch (attack) {
    case "laptop":
      playerAttack = "laptop";
      break;
    case "wand":
      playerAttack = "wand";
      break;
    case "cube":
      playerAttack = "cube";
      break;
  }
  randomAttackEnemy();
};

const randomAttackEnemy = () => {
  const randomAttackOptions = ["laptop", "wand", "cube"];
  let randomAttack = randomAttackOptions[random(0, 2)];
  enemyAttack = randomAttack;
  combat();
};

const combat = () => {
  let spanPlayerLives = $("player-lives");
  let spanEnemyLives = $("enemy-lives");
  if (enemyAttack == playerAttack) {
    createMessage("Tie");
  } else if (playerAttack == "laptop" && enemyAttack == "cube") {
    createMessage("You Win");
    enemyLives--;
    spanEnemyLives.innerHTML = enemyLives;
  } else if (playerAttack == "wand" && enemyAttack == "laptop") {
    createMessage("You Win");
    enemyLives--;
    spanEnemyLives.innerHTML = enemyLives;
  } else if (playerAttack == "cube" && enemyAttack == "wand") {
    createMessage("You Win");
    enemyLives--;
    spanEnemyLives.innerHTML = enemyLives;
  } else {
    createMessage("You Loose");
    playerLives--;
    spanPlayerLives.innerHTML = playerLives;
  }
  checkLives();
};

const checkLives = () => {
  if (enemyLives == 0) {
    finalMessage("YOU ARE THE WINNER");
  } else if (playerLives == 0) {
    finalMessage("YOU ARE THE LOOSER");
  }
};

const createMessage = (result) => {
  let sectionMessages = $("messages");
  let paragrahp = document.createElement("p");
  paragrahp.innerHTML =
    "Your Avatar attacked " +
    playerAttack +
    ", The enemy attacked " +
    enemyAttack +
    "/ " +
    result;
  sectionMessages.appendChild(paragrahp);
};

const finalMessage = (finalResult) => {
  let sectionMessages = $("messages");
  let paragrahp = document.createElement("h2");
  paragrahp.innerHTML = finalResult;
  sectionMessages.appendChild(paragrahp);
  laptopButton.disabled = true;
  wandButton.disabled = true;
  cubeButton.disabled = true;
  sectionReplay.style.display = "block";
};

const replayGame = () => {
  location.reload();
};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Start Game Configuration
const sectionStart = $("start-game");
const startButton = $("start-btn");
const sectionAvatar = $("select-avatar");
const avatarButton = $("avatar-btn");
const sectionAttacks = $("select-attack");
const laptopButton = $("laptop-btn");
const wandButton = $("wand-btn");
const cubeButton = $("cube-btn");
const sectionReplay = $("replay");
const replayButton = $("replay-btn");
const okPopup = $('popup-btn')

sectionAvatar.style.display = "none";
sectionAttacks.style.display = "none";
sectionReplay.style.display = "none";

startButton.addEventListener("click", startGame);
avatarButton.addEventListener("click", selectAvatar);
okPopup.addEventListener('click', () => popup.classList.remove("open-popup"))
laptopButton.addEventListener("click", () => attacks("laptop"));
wandButton.addEventListener("click", () => attacks("wand"));
cubeButton.addEventListener("click", () => attacks("cube"));
replayButton.addEventListener("click", replayGame);

