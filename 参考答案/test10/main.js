/* // 扫雷数组 'X' 表示地雷，数字表示周围8格存在的地雷数，
const arr = [
    [0, 0, 1, 1, 3, 'X', 'X', 2, 1],
    [1, 2, 3, 'X', 3, 'X', 3, 3, 'X'],
    [1, 'X', 'X', 2, 2, 1, 1, 2, 'X'],
    [1, 2, 2, 1, 0, 0, 1, 2, 2],
    [0, 1, 1, 1, 0, 0, 1, 'X', 1],
    [0, 1, 'X', 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]; 
*/
let root;
// 初始扫雷数组，保存地雷的位置
const arr = [
    ['', '', '', '', '', 'X', 'X', '', ''],
    ['', '', '', 'X', '', 'X', '', '', 'X'],
    ['', 'X', 'X', '', '', '', '', '', 'X'],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', 'X', ''],
    ['', '', 'X', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
]
// 如果点击 arr[8][8] arr会变成如下
/* const arr = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', 2, 2, 1, 1, '', ''],
    [1, 2, '', 1, 0, 0, 1, '', ''],
    [0, 1, '', 1, 0, 0, 1, '', ''],
    [0, 1, '', 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
] */

/**
 * @description: 将数字转化为对应的类名
 * @param {*} num
 */
function numberToString(num) {
    let result;
    switch (num) {
        case 0:
            result = 'zero'
            break;
        case 1:
            result = 'one'
            break;
        case 2:
            result = 'two'
            break;
        case 3:
            result = 'three'
            break;
        case 4:
            result = 'four'
            break;
        case 5:
            result = 'five'
            break;
        case 6:
            result = 'six'
            break;
        case 7:
            result = 'seven'
            break;
        case 8:
            result = 'eight'
            break;
        case 'X':
            result = 'mine'
            break;
    }
    return result
}

/**
 * @description: 将扫雷数组渲染成 DOM 结构同时加上样式
 * @param {*} root 被挂载的元素
 * @param {*} mineArr 扫雷数组
 */
function render(mineArr) {
    const trs = mineArr.reduce((templateStr, mineItemArr, row) => {
        const tds = mineItemArr.reduce((str, item, col) => str +
            `
        <td class="${numberToString(item)}" id='${row === 8 && col === 8 && 'sel'}' data-row=${row} data-col=${col} data-raw=${item}>
            ${item == 'x' ? '' : ((item == 0 && item != 'x') ? '' : item)}
        </td>
        `, '');
        const tr = `<tr>${tds}</tr>`;
        return templateStr + tr;
    }, '')
    const table = `<table>${trs}</table>`
    root.innerHTML = table;
}

function endRender() {
    const div = document.createElement('div');

    div.innerHTML = `<div class="cover">
        <div class="content">游戏结束</div>
    </div>`;
    root.parentNode.appendChild(div.children[0]);
    render(arr)
}

/* 
    用户点到了数字0
        1、显示自己
        2、找四周
            1、显示四周（如果四周的值不为0，那就显示到这里，不需要再找了）
            2、如果值为0
                1、显示自己
                2、找四周（如果四周的值不为0，那就显示到这里，不需要再找了）
                    1、显示自己
                    2、找四周（如果四周的值不为0，那就显示到这里，不需要再找了）
 */
function getAroundAndCount(arr, { row, col }) {
    let count = 0;	//保存四周雷的个数
    const positionWithoutMineArr = [];
    //通过坐标去循环九宫格
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (
                i < 0 ||	//格子超出了左边的范围
                j < 0 ||	//格子超出了上边的范围
                i > 8 ||	//格子超出了右边的范围
                j > 8 ||	//格子超出了下边的范围
                (i == row && j == col) 	//当前循环到的格子是自己
            ) {
                continue;
            }
            if (arr[i][j] == 'X') {
                count++;
            } else {
                positionWithoutMineArr.push({ row: i, col: j })
            }
        }
    }
    arr[row][col] = count;
    return { positionWithoutMineArr, count };
}
// 定义一个二维数组，初始时默认为 false,扫雷数组的某项被确认后为 true
const flagData = new Array(9).fill('').map(() => new Array(9).fill(false));
function getMineArr(arr, { row, col }) {
    if (flagData[row][col]) return
    flagData[row][col] = true;

    const { positionWithoutMineArr, count } = getAroundAndCount(arr, { row, col });
    positionWithoutMineArr.forEach((around) => {
        count == 0 && getMineArr(arr, around)
    })

}

let hideMineArr = arr;
function initEvent() {
    document.querySelector('table').addEventListener('click', (e) => {
        if (e.target.nodeName !== 'TD') return
        const row = Number(e.target.dataset.row);
        const col = Number(e.target.dataset.col);
        if (arr[row][col] === 'X') {
            endRender();
            return
        }
        getMineArr(arr, { row, col })
        hideMineArr = arr.map(arrs => arrs.map(item => item === 'X' ? '' : item))
        render(hideMineArr);
        initEvent();
    })
}
function init(app, data) {
    root = app;
    render(data);
    initEvent();
}
