let snake; // 数组，保存蛇的大小和位置
let egg;  // 对象，保存蛋的大小和位置
let isEnd = false; // 游戏是否结束的标志位
let rate = 30;//表示分成多少格子
let timer; // 定时器，用来开启蛇移动
let App;  // DOM结构挂载的节点
let snakeSpeed = 5; // 蛇的移动速度，越大越快
let direction; // 蛇的移动方向

/**
 * @description: 根据地图的大小配置初始化蛇的大小和位置
 * @param {number} width 地图等分后每个小块的宽
 * @param {number} height 地图等分后每个小块的高
 */
function snakeConfig(width, height) {
    // 蛇头在第一位，第二位是蛇身,第三位是蛇尾，初始化设置
    const snakeInit = [{ left: 2, top: 0, width: 1, height: 1 },
    { left: 1, top: 0, width: 1, height: 1 },
    { left: 0, top: 0, width: 1, height: 1 }];
    snake = snakeInit.map(item => {
        return {
            left: item.left * width,
            top: item.top * height,
            width: item.width * width,
            height: item.height * height,
        }
    })
}

/**
 * @description: 根据地图的等分数产生0-等分数的随机数
 * @param {number} rate 地图的等分数
 * @return {number} 随机数
 */
function getRandom(rate) {
    return Math.floor(Math.random() * rate)
}
/**
 * @description: (随机)生成蛋的位置
 * @param {*} width 地图等分后每个小块的宽
 * @param {*} height 地图等分后每个小块的高
 */
function eggConfig(width, height) {
    // 下面一行代码为随机生成蛋的位置，为了测试方便改为固定在 (8,0) 位置生成蛋，如果想要实现完整版的功能请将代码 copy 到本地进行
    // let eggInit = { left: getRandom(rate), top: getRandom(rate), width: 1, height: 1 }
    let eggInit = { left: 8, top: 0, width: 1, height: 1 };
    egg = {
        left: eggInit.left * width,
        top: eggInit.top * height,
        width: eggInit.width * width,
        height: eggInit.height * height,
    }
}

/**
 * @description: 根据蛇头方向生成蛇的DOM的模板字符串
 * @param {*} direction 蛇头方向
 * @return {*} 蛇的模板字符串
 */
function snakeTemplateCreate(direction) {
    let template = '', transformDeg = 0;
    switch (direction) {
        case 'right':
            transformDeg = 0
            break;
        case 'down':
            transformDeg = 90
            break;
        case 'left':
            transformDeg = 180
            break;
        case 'up':
            transformDeg = -90
            break;
    }
    template = snake.reduce((prev, next, currentIndex) => {
        if (currentIndex === 0) {
            template = prev + `<div class="snake-head snake" 
        style="left:${next.left}px;top:${next.top}px;border-width:${next.width / 2}px;transform: rotate(${transformDeg}deg);"></div>
        `
        } else {
            template = prev + `<div class="snake-body snake" 
        style="left:${next.left}px;top:${next.top}px;width:${next.width}px;height:${next.height}px;transform: rotate(${transformDeg}deg);"></div>`
        }
        return template
    }, '');
    return template;
}

/**
 * @description: 根据蛋的大小和位置创建蛋的 DOM 节点
 * @return {HTMLElement} 蛋的 DOM 节点
 */
function eggDomCreate() {
    const div = document.createElement('div');
    div.innerHTML = `<div class ='egg' style="left:${egg.left}px;top:${egg.top}px;width:${egg.width}px;height:${egg.height}px">`;
    return div.children[0];
}

/**
 * @description: 将蛇和蛋的模板字符串渲染到页面上
 * @param {*} app DOM结构挂载的节点
 * @param {*} snake snake 的数据
 * @param {*} egg egg 的数据
 */
function render(app, direction = 'right') {
    const snakeTemplate = snakeTemplateCreate(direction);
    const eggDom = eggDomCreate();
    app.innerHTML = snakeTemplate;
    app.appendChild(eggDom);
}

/**
 * @description: 根据移动方向在蛇尾添加一格表示蛇已经吃到蛋，通过 push 方式向数组添加一项
 * @param {*} width 地图等分后每个小块的宽
 * @param {*} height 地图等分后每个小块的高
 */
function snakeEatEgg(width, height) {//在蛇尾部生成一个位置
    let lens = snake.length, finallySnakes;
    const prev = snake[lens - 2];//蛇尾部倒数第二个
    const next = snake[lens - 1];//蛇尾部倒数第一个
    if (prev.top === next.top && prev.left < next.left) {//向左运动
        finallySnakes = { ...next, left: next.left + width }
    } else if (prev.top === next.top && prev.left > next.left) {//向右运动
        finallySnakes = { ...next, left: next.left - width }
    } else if (prev.left === next.left && prev.top > next.top) {//向下运动
        finallySnakes = { ...next, top: next.top - height }
    } else {//向上运动
        finallySnakes = { ...next, top: next.top + height }
    }
    snake.push(finallySnakes);
    console.log("🚀 ~ file: main.js ~ line 132 ~ snakeEatEgg ~ snake", snake)
}

/**
 * @description: 定义蛇头下一步移动的位置，同时判断是否吃到蛋或者是否撞墙
 * @param {*} width  地图等分后每个小块的宽
 * @param {*} height  地图等分后每个小块的高
 * @param {*} direction 蛇头移动的方向
 */
function move(width, height, direction) {
    let snakeHead;
    if (direction === 'right') {
        snakeHead = { ...snake[0], left: snake[0].left + width, }
    } else if (direction === 'left') {
        snakeHead = { ...snake[0], left: snake[0].left - width, }
    } else if (direction === 'up') {
        snakeHead = { ...snake[0], top: snake[0].top - height, }
    } else if (direction === 'down') {
        snakeHead = { ...snake[0], top: snake[0].top + height, }
    }
    snake.unshift(snakeHead);
    snake.pop();
    // 蛇吃蛋判断，吃到蛋在蛇尾添加一格，重新生成蛋的位置
    if (isArriveEgg()) {
        snakeEatEgg(width, height);
        eggConfig(width, height);
    }
}
/**
 * @description: 判断蛇是否吃到蛋
 * @return {boolean}
 */
function isArriveEgg() {
    let isArrive = false;
    if (snake[0].left === egg.left && snake[0].top === egg.top) isArrive = true;
    return isArrive
}
/**
 * @description: 判断蛇是否撞墙
 * @return {boolean}
 */
function isArriveWall(width, height) {
    // 判断是否撞墙

    if (snake[0].left >= width * rate ||
        snake[0].top >= height * rate ||
        snake[0].left < 0 ||
        snake[0].top < 0) isEnd = true;
    // 判断是否撞自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].left == snake[i].left && snake[0].top == snake[i].top) {
            isEnd = true;
            break;
        }
    }
    return isEnd;
}
function autoMove(width, height, direction) {
    timer = setInterval(() => {
        move(width, height, direction);
        // 判断是否撞墙
        if (isArriveWall(width, height)) {
            endGame();
            return
        }
        render(app, direction);
    }, Math.floor(1000 / snakeSpeed));
}

function endGameDomCreate() {
    const div = document.createElement('div');
    div.innerHTML = `<div class="cover">
        <div class="content">游戏结束，得分${snake.length - 3}</div>
    </div>`;
    return div.children[0];
}
function endGame() {
    timer && clearInterval(timer);
    const endGameDom = endGameDomCreate();
    App.parentNode.appendChild(endGameDom);
    endGameDom.addEventListener('click', () => {
        App.parentNode.removeChild(endGameDom);
        init(App, rate, snakeSpeed);
        isEnd = false;
    });
}

/**
 * @description: 通过键盘点击决定蛇移动的方向
 */
function initEvent(width, height) {
    document.addEventListener('keydown', (e) => {
        if ((e.key === "ArrowUp" || e.key.toLocaleLowerCase() === "w")) {
            direction != 'down' && (direction = 'up');
        } else if ((e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "s")) {
            direction != 'up' && (direction = 'down');
        } else if ((e.key === "ArrowRight" || e.key.toLocaleLowerCase() === "d")) {
            direction != 'left' && (direction = 'right');
        } else if ((e.key === "ArrowLeft" || e.key.toLocaleLowerCase() === "a")) {
            direction != 'right' && (direction = 'left');
        }
        if (!direction || isEnd) return
        timer && clearInterval(timer);
        autoMove(width, height, direction);
    })
}

function init(app, dot = 30, speed = 5) {
    App = app;
    let { width, height } = app.getBoundingClientRect();
    width = width / rate;
    height = height / rate;
    dot && (rate = dot);
    speed && (snakeSpeed = speed);
    snakeConfig(width, height);
    eggConfig(width, height);
    render(app);
    initEvent(width, height);
}