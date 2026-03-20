function calcInsert() {
    const targetRally = parseFloat(document.getElementById('targetRally').value) || 0;
    const enemyTime = parseFloat(document.getElementById('enemyTime').value) || 0;
    const myTime = parseFloat(document.getElementById('myTime').value) || 0;
    const offset = parseFloat(document.getElementById('offset').value) || 0;

    // 計算式：
    // 集結の着弾時刻 = 現在時刻 + 集結残り秒数 + 相手の行軍時間
    // 自分の着弾目標 = 集結の着弾時刻 + offset
    // 自分の出すタイミング（集結残り秒数ベース）= 自分の行軍時間 - 相手の行軍時間 + offset
    
    const launchAt = myTime - enemyTime + offset;

    const resultDiv = document.getElementById('insertResult');
    if (launchAt < 0) {
        resultDiv.innerText = "即出し！";
        resultDiv.style.fontSize = "1.5rem";
    } else {
        resultDiv.innerText = "残り " + launchAt.toFixed(1) + " 秒";
        resultDiv.style.fontSize = "2.5rem";
    }
}

// 初期計算
window.onload = calcInsert;
