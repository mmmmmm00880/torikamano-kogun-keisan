function calc() {
    // 入力値の取得（分を秒に変換）
    const enemyTotal = (parseInt(document.getElementById('enemyMin').value) || 0) * 60 + (parseInt(document.getElementById('enemySec').value) || 0);
    const myTotal = (parseInt(document.getElementById('myMin').value) || 0) * 60 + (parseInt(document.getElementById('mySec').value) || 0);
    const offset = parseInt(document.getElementById('offset').value) || 0;

    // 発射タイミング（集結残り秒数）の計算
    // 式： 自分の行軍時間 - 相手の行軍時間 + 差し込みたい秒数
    let launchAtTotal = myTotal - enemyTotal + offset;

    const resultDiv = document.getElementById('insertResult');

    if (launchAtTotal <= 0) {
        resultDiv.innerText = "即出し！";
        resultDiv.style.fontSize = "1.8rem";
    } else {
        // 秒を「分：秒」の形式に戻す
        const m = Math.floor(launchAtTotal / 60);
        const s = launchAtTotal % 60;
        
        // 1桁の秒数を「05」のように表示
        const displayS = s < 10 ? "0" + s : s;
        
        resultDiv.innerText = m + "分 " + displayS + "秒";
        resultDiv.style.fontSize = "2.2rem";
    }
}

// ページを開いた時に一度計算する
window.onload = calc;
