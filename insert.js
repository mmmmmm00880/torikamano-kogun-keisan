function calc() {
    // 入力値の取得（分を秒に変換）
    const enemyMin = parseInt(document.getElementById('enemyMin').value) || 0;
    const enemySec = parseInt(document.getElementById('enemySec').value) || 0;
    const enemyTotal = (enemyMin * 60) + enemySec;

    const myMin = parseInt(document.getElementById('myMin').value) || 0;
    const mySec = parseInt(document.getElementById('mySec').value) || 0;
    const myTotal = (myMin * 60) + mySec;

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
        // 【プラスの場合】相手が走り出す「前」の「出発時間」を出す
        labelP.innerText = "集結の「出発時間」が";
        resultDiv.innerText = timeStr;
        resultDiv.style.color = "#d32f2f"; // 赤
    }
    
    // 文字サイズを調整
    resultDiv.style.fontSize = "2.2rem";
}

// ページを開いた時に一度計算する
window.onload = calc;

// マップのデータ（0は表示なし、数字は秒数、'S'は太陽城、'F'は要塞、'G'はグレーゾーン）
const mapData = [
    [0,0,0,0,0,66,0,0,0,0,66,0,0,0],
    [0,0,0,0,0,58,55,52,52,55,58,0,0,0],
    [0,0,0,0,0,50,47,45,45,47,50,0,0,0],
    [0,0,0,0,48,43,39,36,36,39,43,48,0,0],
    [66,58,50,43,'F','G','G','G','G','F',43,50,58,66],
    [0,55,47,39,'G','G','G','G','G','G',39,47,55,0],
    [0,52,45,36,'G','G','S','S','G','G',36,45,52,0],
    [0,52,45,36,'G','G','S','S','G','G',36,45,52,0],
    [0,50,47,39,'G','G','G','G','G','G',39,47,55,0],
    [66,58,50,43,'F','G','G','G','G','F',43,50,58,66],
    [0,0,0,48,43,39,36,36,39,43,48,0,0,0],
    [0,0,0,0,50,47,45,45,47,50,0,0,0,0],
    [0,0,0,0,58,55,52,52,55,58,0,0,0,0],
    [0,0,0,0,0,66,0,0,0,0,66,0,0,0]
];

// マップを生成するメイン関数
function generateMap() {
    const grid = document.getElementById('castleMap');
    if(!grid) {
        // 準備ができていなければ少し待って再試行
        setTimeout(generateMap, 100);
        return;
    }

    grid.innerHTML = ''; // 初期化

    mapData.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (val === 'S') { 
                cell.classList.add('sun-castle'); 
                cell.innerText = '太陽'; 
            }
            else if (val === 'F') { 
                cell.classList.add('fortress'); 
                cell.innerText = '砦'; 
            }
            else if (val === 'G') { 
                cell.classList.add('gray-zone'); 
            }
            else if (typeof val === 'number' && val > 0) {
                cell.innerText = val;
                // 🌟 ここが「相手の位置」に入力する処理
                cell.onclick = () => {
                    document.getElementById('enemyMin').value = 0;
                    document.getElementById('enemySec').value = val;
                    calc(); // 再計算
                };
            }
            grid.appendChild(cell);
        });
    });
}

// 読み込み完了時にマップ生成を実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateMap);
} else {
    generateMap();
}
