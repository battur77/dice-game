// тоглоомын бүх газар ашиглах глобал хувьсагчийг зарлах
// идэвхитэй тоглогчийг энд хадгална
var activePlayer;
//2 тоглогчийн цуглуулсан оноо
var scores;
// идэвхитэй тоглогчийн ээлжийн оноо
var roundScore;

//шооны зургийг үзүүлэх элементийг ДОМ-с хайж гаргаж авч байгаа
var diceDom = document.querySelector(".dice");

//тоглоомыг эхлүүлэнэ
initGame();
// Шоог шидэх эвент листнер
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 доторх тоог санамсаргүй гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  //Шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.src = "dice-" + diceNumber + ".png";

  // буусан тоо нь 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
  if (diceNumber !== 1) {
    //1-с ялгаатай тоо буулаа буусан тоог тоглогчид нэмж өгнө
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    switchToNextPlayer();
  }
});

// HOLD товчны эвент листнер
document.querySelector(".btn-hold").addEventListener("click", function () {
  //уг товчний цуглуулсан оноог глобал оноо дээр нэмнэ.
  scores[activePlayer] = scores[activePlayer] + roundScore;
  //дэлгэц дээр оноог өөрчлөнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //тоглогч хожсон эсэхийг шалгах 100 оноотой болсон уу
  if (scores[activePlayer] >= 10) {
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    //тоглогчийн ээлжийг солино.
    switchToNextPlayer();
  }
});

//тоглох ээлжийг шилжүүлдэг
function switchToNextPlayer() {
  // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө
  //энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = "0";

  // хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго. үгүй бол 0 болго
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //улаан цэг шилжүүлэх код
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //шоог түр алга болгох
  diceDom.style.display = "none";
}

//шинэ тоглоом эхлүүлэх товч листнер

document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
  // тоглогчийн ээлжийг хадгалах хувьсагч 1-р тоглогч 0, 2-р тоглогч нь 1
  activePlayer = 0;

  //тоглогчдийн цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  //тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  //програм эхлэхэд бэлтгэх
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //тоглогчидийн нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}
