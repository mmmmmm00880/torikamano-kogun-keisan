let timerId = null;
let count = -3;

function addRow(data = {name:'', all:'', memo:'', target:0, time:40}) {
    const tbody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    // 初期着弾秒は行数に合わせて1, 2, 3...
    const defaultTarget = (data.target !== undefined) ? data.target : (tbody.children.length + 1);
    
    row.innerHTML = `
        <td class="col-no"></td>
        <td class="col-name"><input type="text" value="${data.name}" placeholder="名前" oninput="update()"></td>
        <td class="col-all"><input type="text" value="${data.all}" placeholder="ABC" oninput="update()"></td>
        <td class="col-memo"><input type="text" value="${data.memo}" placeholder="備考" oninput="update()"></td>
        <td class="col-target"><input type="number" value="${defaultTarget}" oninput="update()"></td>
        <td class="col-time"><input type="number" value="${data.time}" min="1" oninput="update()"></td>
        <td class="col-wait"><span class="wait-display">-</span></td>
        <td class="col-del"><button class="btn btn-del" onclick="this.closest('tr').remove(); update()">×</button></td>
    `;
    tbody.appendChild(row);
    update();
}

function update() {
    const rows = Array.from(document.querySelectorAll('#tableBody tr'));
    const rowData = rows.map(row => {
        const inputs = row.querySelectorAll('input');
        return {
            name: inputs[0].value,
            all: inputs[1].value,
            memo: inputs[2].value,
            target: parseInt(inputs[3].value) || 0,
            time: parseInt(inputs[4].value) || 0
        };
    });

    let maxLaunchRef = 0;
    rowData.forEach(d => {
        if (d.time + d.target > maxLaunchRef) maxLaunchRef = d.time + d.target;
    });

    let copyStr = "着弾スケジュール\n";
    rows.forEach((row, i) => {
        row.querySelector('.col-no').innerText = i + 1;
        const d = row.querySelectorAll('input');
        const d_vals = {
            name: d[0].value,
            all: d[1].value,
            memo: d[2].value,
            target: parseInt(d[3].value) || 0,
            time: parseInt(d[4].value) || 0
        };
        const wait = maxLaunchRef - (d_vals.time + d_vals.target);
        row.querySelector('.wait-display').innerText = wait;
        row.dataset.wait = wait;
        copyStr += `${i+1}.${d_vals.name||'--'}(${d_vals.all||'--'}) ${d_vals.memo? d_vals.memo+' ':''}待機:${wait}秒\n`;
    });
    
    document.getElementById('copyText').innerText = copyStr;
    localStorage.setItem('rallyFinalSimpleV4', JSON.stringify(rowData));
}

function toggleTimer() {
    const btn = document.getElementById('startBtn');
    const display = document.getElementById('mainTimer');
    if (timerId) {
        clearInterval(timerId); timerId = null; count = -3;
        btn.innerText = "カウント開始！"; btn.style.background = "#ff7b00";
        display.innerText = count;
        display.className = "timer-display";
    } else {
        btn.innerText = "リセット"; btn.style.background = "#666";
        timerId = setInterval(() => {
            count++;
            display.innerText = count;
            display.className = count < 0 ? "timer-display counting-down" : "timer-display";
            document.querySelectorAll('#tableBody tr').forEach(r => {
                r.classList.toggle('active-row', parseInt(r.dataset.wait) === count);
            });
        }, 1000);
    }
}

function copyText() {
    const text = document.getElementById('copyText').innerText;
    navigator.clipboard.writeText(text).then(() => alert("コピーしたのだ！"));
}

const saved = localStorage.getItem('rallyFinalSimpleV4');
if (saved) JSON.parse(saved).forEach(d => addRow(d));
else for(let i=0; i<3; i++) addRow({name:'', all:'', memo:'', target:i+1, time:40});
