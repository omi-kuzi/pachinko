const canvas = document.getElementById("slotCanvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("resultDiv");
const winSound = document.getElementById("winSound");
const buttonSound = document.getElementById("buttonSound");

canvas.width = 600;
canvas.height = 200;

let shotCount = 0;  // 打った回数
let spinSpeed = 10; // スロット回転スピード
let reelPosition = 0;  // 現在の回転位置

// スロット画像（シンプルな四角で表現）
function drawSlotReels() {
  const slotWidth = canvas.width / 3;
  
  // スロットが回転している感じを演出
  reelPosition = (reelPosition + spinSpeed) % (canvas.height);
  
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === 1 ? "gold" : "gray";
    ctx.fillRect(i * slotWidth, canvas.height - 10, slotWidth, 10);
    
    // スロットが回転しているように、位置を調整
    ctx.beginPath();
    ctx.rect(i * slotWidth, canvas.height - reelPosition, slotWidth, 100);
    ctx.fill();
  }
}

// 当たりを表示
function stopReels() {
  const reelStopPosition = Math.floor(Math.random() * 3);  // ランダムに停止位置
  if (reelStopPosition === 1) {
    ctx.fillStyle = "red";  // 当たりの位置を赤く表示
    ctx.fillRect(0, canvas.height - 30, canvas.width / 3, 10); // 表示位置
    resultDiv.textContent = "当たり！🎉";  // 当たりのメッセージ
    showFireworks();
    playWinSound();
  }
}

// 花火エフェクト
function showFireworks() {
  const fireworks = 10;  // 花火の数
  for (let i = 0; i < fireworks; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const size = Math.random() * 30 + 20;
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // ランダムな色

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// 放射線エフェクト
function showLightEffect() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;

  for (let angle = 0; angle < 360; angle += 30) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle * Math.PI / 180) * 200, centerY + Math.sin(angle * Math.PI / 180) * 200);
    ctx.stroke();
  }
}

// 背景変更（シンプルな夜空）
function changeBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "black");  // 上部が暗い色
  gradient.addColorStop(1, "darkblue");  // 下部が少し青みがかった色

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// スロットを回す
spinButton.addEventListener("click", () => {
  playButtonClickSound();
  shotCount++;
  resultDiv.textContent = "結果: スロット回転中...";

  // スロット回転アニメーション
  let frame = 0;
  const spinInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeBackground();
    drawSlotReels();
    
    frame++;
    if (frame > 100) { // 100フレーム後に停止
      clearInterval(spinInterval);
      stopReels();
    }
  }, 50);
});

// 音楽再生
function playWinSound() {
  winSound.play();
}

function playButtonClickSound() {
  buttonSound.play();
}
