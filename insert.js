function calc() {
    // 入力値の取得（分を秒に変換）
    const enemyTotal = (parseInt(document.getElementById('enemyMin').value) || 0) * 60 + (parseInt(document.getElementById('enemySec').value) || 0);
    const myTotal = (parseInt(document.getElementById('myMin').value) || 0) * 60 + (parseInt(document.getElementById('mySec').value) || 0);
    const offset = parseInt(document.getElementById('offset').value) || 0;

    // 計算式： 自分の行軍時間 - 相手の行軍時間 + 差し込みたい秒数
    let launchAtTotal = myTotal - enemyTotal + offset;

    const resultDiv = document.getElementById('insertResult');
    const labelP = resultDiv.previousElementSibling; // 「画面の集結カウントが」の部分

    // 絶対値（ABS）を取得
    const absValue = Math.abs(launchAtTotal);
    const m = Math.floor(absValue / 60);
    const s = absValue % 60;
    const displayS = s < 10 ? "0" + s : s;
    const timeStr = m + "分 " + displayS + "秒";

    if (launchAtTotal <= 0) {
        // 【0以下の場合】相手が走り出した「後」の残り秒数で出す
        labelP.innerText = "集結の「残り時間」が";
        resultDiv.innerText = timeStr;
        resultDiv.style.color = "#bf360c"; // オレンジ
    } else {
        // 【プラスの場合】相手が走り出す「前」の出発時間（ABS）で出す
        labelP.innerText = "集結の「行軍時間」が";
        resultDiv.innerText = timeStr;
        resultDiv.style.color = "#d32f2f"; // 赤
    }
    
    // 文字サイズを調整（分秒が入るので少し小さめに）
    resultDiv.style.fontSize = "2.2rem";
}

// ページを開いた時に一度計算する
window.onload = calc;
