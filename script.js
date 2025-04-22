let baseChance = 1 / 550;
let currentChance = baseChance;

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
  spinButton.disabled = true;

  let reel1 = document.getElementById("reel1");
  let reel2 = document.getElementById("reel2");
  let reel3 = document.getElementById("reel3");

  // 回転アニメーション
  let rotateReels = (duration) => {
    let stopTime = Date.now() + duration;

    let rotate = () => {
      if (Date.now() < stopTime) {
        reel1.innerHTML = getRandomElement(reels[0]);
        reel2.innerHTML = getRandomElement(reels[1]);
        reel3.innerHTML = getRandomElement(reels[2]);
        requestAnimationFrame(rotate); // 次のフレームで繰り返し
      }
    };

    rotate(); // 最初の回転を開始
  };

  // リールが回転開始
  rotateReels(1500); // 1.5秒間回転

  setTimeout(() => {
    let result = checkResult(reel1, reel2, reel3);
    resultText.innerHTML = `結果: ${result}`;

    if (result === "昇格！") {
      message.innerHTML = "おめでとう！昇格しました！";
    } else if (result === "リーチ！") {
      message.innerHTML = "リーチ状態！次回は当たりかも！";
    } else if (result === "ジャックポット！") {
      message.innerHTML = "ジャックポット！おめでとう！";
    } else {
      message.innerHTML = "";
    }

    // 確率を更新
    updateChance();

    spinButton.disabled = false;
  }, 1500); // 回転が終わるまで待つ
}

function getRandomElement(reel) {
  return reel[Math.floor(Math.random() * reel.length)];
}

function checkResult(reel1, reel2, reel3) {
  reel1 = reel1.innerText;
  reel2 = reel2.innerText;
  reel3 = reel3.innerText;

  // 昇格演出：BARが出たときに昇格
  if (reel1 === "BAR" || reel2 === "BAR" || reel3 === "BAR") {
    // 10%の確率で昇格
    if (Math.random() < 0.1) {
      if (reel1 === "BAR") {
        reel1 = "7";
        document.getElementById("reel1").innerText = "7";
        return "昇格！";
      } else if (reel2 === "BAR") {
        reel2 = "7";
        document.getElementById("reel2").innerText = "7";
        return "昇格！";
      } else if (reel3 === "BAR") {
        reel3 = "7";
        document.getElementById("reel3").innerText = "7";
        return "昇格！";
      }
    }
  }

  // ジャックポット：すべてのリールが一致
  if (reel1 === reel2 && reel2 === reel3) {
    return "ジャックポット！";
  }

  // リーチ：リールが2つ以上一致
  if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
    return "リーチ！";
  }

  return "ハズレ";
}

function updateChance() {
  currentChance += 0.00005; // 0.005%上げる
  if (Math.random() < currentChance) {
    console.log("確率が上がった!");
  }
}
