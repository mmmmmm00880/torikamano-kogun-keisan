function calc() {
    // 入力値の取得（分を秒に変換）
    const enemyTotal = (parseInt(document.getElementById('enemyMin').value) || 0) * 60 + (parseInt(document.getElementById('enemySec').value) || 0);
    const myTotal = (parseInt(document.getElementById('myMin').value) || 0) * 60 + (parseInt(document.getElementById('mySec').value) || 0);
    const offset = parseInt(document.getElementById('offset').value) || 0;

    // 計算式： 自分の行軍時間 - 相手の行軍時間 + 差し込みたい秒数
    let launchAtTotal = myTotal - enemyTotal + offset;

    const resultDiv = document.getElementById('insertResult');
    const labelP = resultDiv.previousElementSibling; // 「画面の集結カウントが」の部分

    if (launchAtTotal <= 0) {
        // 【プラス（または0）の場合】相手が走り出した「後」に自分が出る
        // 表示例：集結残り 05秒 になったら発射
        const absValue = Math.abs(launchAtTotal);
        const m = Math.floor(absValue / 60);
        const s = absValue % 60;
        const displayS = s < 10 ? "0" + s : s;

        labelP.innerText = "集結の「残り時間」が";
        resultDiv.innerText = m + "分 " + displayS + "秒";
        resultDiv.style.color = "#bf360c"; // 通常のオレンジ系
    } else {
        // 【マイナスの場合】相手が走り出す「前」に自分が出る
        // 表示例：集結の「出発時間」が 1分10秒 になったら発射
        const m = Math.floor(launchAtTotal / 60);
        const s = launchAtTotal % 60;
        const displayS = s < 10 ? "0" + s : s;

        labelP.innerText = "集結の「出発時間」が";
        resultDiv.innerText = m + "分 " + displayS + "秒";
        resultDiv.style.color = "#d32f2f"; // 注意を促す赤系
    }
}

// ページを開いた時に一度計算する
window.onload = calc;
