let baseChance = 1 / 550; // 初期確率
let currentChance = baseChance; // 現在の確率

let reels = [
  ["7", "BAR", "🍒"],
  ["7", "BAR", "🍒"],
  ["7", "BAR", "🍒"]
];

let resultText = document.getElementById("result");
let message = document.getElementById("message");
let spinButton = document.getElementById("spinButton");

spinButton.addEventListener("click", spin);

function spin() {
  // 回転アニメーション
  spinButton.disabled = true;
  let reel1 = document.getElementById("reel1");
  let reel2 = document.getElementById("reel2");
  let reel3 = document.getElementById("reel3");

  let spinAnimation = () => {
    reel1.innerHTML = getRandomElement(reels[0]);
    reel2.innerHTML = getRandomElement(reels[1]);
    reel3.innerHTML = getRandomElement(reels[2]);

    // 3回目の回転まで
    setTimeout(spinAnimation, 100);
  };

  spinAnimation();

  // 1秒後に最終結果を表示
  setTimeout(() => {
    // 結果判定
    let result = checkResult();
    resultText.innerHTML = `結果: ${result}`;

    // 昇格演出
    if (result === "昇格！") {
      message.innerHTML = "おめでとう！昇格しました！";
    } else if (result === "リーチ！") {
      message.innerHTML = "リーチ状態！次回は当たりかも！";
    } else {
      message.innerHTML = "";
    }

    // 確率を更新
    updateChance();

    spinButton.disabled = false;
  }, 1000);
}

function getRandomElement(reel) {
  return reel[Math.floor(Math.random() * reel.length)];
}

function checkResult() {
  // スロットが3つ同じで揃ったら当たり
  let reel1 = document.getElementById("reel1").innerText;
  let reel2 = document.getElementById("reel2").innerText;
  let reel3 = document.getElementById("reel3").innerText;

  if (reel1 === reel2 && reel2 === reel3) {
    return "ジャックポット！";
  }

  // リーチ演出
  if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
    triggerFlash(reel1 === reel2 ? "reel1" : reel2 === reel3 ? "reel2" : "reel3");
    return "リーチ！";
  }

  // 昇格演出
  if (Math.random() < 0.1) { // 10%の確率で昇格演出
    if (reel1 === "BAR") {
      document.getElementById("reel1").innerText = "7";
      return "昇格！";
    } else if (reel2 === "BAR") {
      document.getElementById("reel2").innerText = "7";
      return "昇格！";
    } else if (reel3 === "BAR") {
      document.getElementById("reel3").innerText = "7";
      return "昇格！";
    }
  }

  return "ハズレ";
}

function triggerFlash(reelId) {
  let reel = document.getElementById(reelId);
  reel.classList.add("flash");
  setTimeout(() => {
    reel.classList.remove("flash");
  }, 500);
}

function updateChance() {
  currentChance += 0.00005; // 0.005%上げる
  if (Math.random() < currentChance) {
    console.log("確率が上がった!");
  }
}
