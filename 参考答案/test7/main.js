function getRandom(rate) {
    return Math.floor(Math.random() * rate)
}
class Snake {
    constructor(snakeBody, size, direction) {
        this.direction = direction;
        this.size = size;
        this.snakeBody = snakeBody.length > 0 && snakeBody.map(pos => ({ left: pos.left * size, top: pos.top * size }));
    }
    render() {
        let template = '', transformDeg = 0;
        switch (this.direction) {
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
        return this.snakeBody.reduce((prev, next, currentIndex) => {
            if (currentIndex === 0) {
                template = prev + `<div class="snake-head snake" 
            style="left:${next.left}px;top:${next.top}px;border-width:${this.size / 2}px;transform: rotate(${transformDeg}deg);"></div>
            `
            } else {
                template = prev + `<div class="snake-body snake" 
            style="left:${next.left}px;top:${next.top}px;width:${this.size}px;height:${this.size}px;transform: rotate(${transformDeg}deg);"></div>`
            }
            return template
        }, '');
    }
    nextStep(isEatEgg) {
        console.log("🚀 ~ file: snake.js ~ line 47 ~ Snake ~ nextStep ~ isEatEgg", isEatEgg)
        let snakeHead;
        let snake = this.snakeBody;
        if (this.direction === 'right') {
            snakeHead = { ...snake[0], left: snake[0].left + this.size, }
        } else if (this.direction === 'left') {
            snakeHead = { ...snake[0], left: snake[0].left - this.size, }
        } else if (this.direction === 'up') {
            snakeHead = { ...snake[0], top: snake[0].top - this.size, }
        } else if (this.direction === 'down') {
            snakeHead = { ...snake[0], top: snake[0].top + this.size, }
        }
        this.snakeBody.unshift(snakeHead);
        this.snakeBody.pop();
    }
    snakeGrowUp() {
        console.log("🚀 ~ file: snake.js ~ line 65 ~ Snake ~ snakeGrowUp ~ snakeGrowUp")
        let snake = this.snakeBody;
        let lens = snake.length;
        let snakeTail;
        const prev = snake[lens - 2];//蛇尾部倒数第二个
        const next = snake[lens - 1];//蛇尾部倒数第一个
        if (prev.top === next.top && prev.left < next.left) {//向左运动
            snakeTail = { ...next, left: next.left + this.size }
        } else if (prev.top === next.top && prev.left > next.left) {//向右运动
            snakeTail = { ...next, left: next.left - this.size }
        } else if (prev.left === next.left && prev.top > next.top) {//向下运动
            snakeTail = { ...next, top: next.top - this.size }
        } else {//向上运动
            snakeTail = { ...next, top: next.top + this.size }
        }
        this.snakeBody.push(snakeTail);
        this.render();
    }
    isArriveWall() {
        const snake = this.snakeBody;
        let isEnd;
        // 判断是否撞墙
        if (snake[0].left >= this.size * MAPSIZE ||
            snake[0].top >= this.size * MAPSIZE ||
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
    changeSnakeDirection(direction) {
        this.direction = direction;
    }
}

class Egg {
    constructor(size) {
        // this.position = { left: getRandom(MAPSIZE) * size, top: getRandom(MAPSIZE) * size };
        this.position = { left: 3 * size, top: 0 * size };
        this.size = size;
    }
    render() {
        const div = document.createElement('div');
        div.innerHTML = `<div class ='egg' style="left:${this.position.left}px;top:${this.position.top}px;width:${this.size}px;height:${this.size}px">`;
        return div.children[0];
    }
    flushed() {
        this.position = { left: getRandom(MAPSIZE) * this.size, top: getRandom(MAPSIZE) * this.size };
    }
}

function isArriveEgg(snake, egg) {
    const snakeBody = snake.snakeBody;
    return snakeBody[0].left === egg.position.left && snakeBody[0].top === egg.position.top;
}

const MAPSIZE = 30;
let timer;

function init(app) {
    const snake = new Snake([{ left: 2, top: 0 }, { left: 1, top: 0 }, { left: 0, top: 0 }], 20);
    const egg = new Egg(20);
    render(app, snake, egg);
    let direction;
    document.addEventListener('keydown', (e) => {
        if ((e.key === "ArrowUp" || e.key.toLocaleLowerCase() === "w")) {
            direction != 'down' && (direction = 'up');
        } else if ((e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "s")) {
            direction != 'up' && (direction = 'down');
        } else if ((e.key === "ArrowRight" || e.key.toLocaleLowerCase() === "d")) {
            direction != 'left' && (direction = 'right');
        } else if ((e.key === "ArrowLeft" || e.key.toLocaleLowerCase() === "a")) {
            direction != 'right' && (direction = 'left');
        } else {
            return
        }
        snake.changeSnakeDirection(direction);
        timer && clearInterval(timer);
        direction && autoMove(app, snake, egg);
    })
}
function autoMove(app, snake, egg) {
    timer = setInterval(() => {
        snake.nextStep();
        if(isArriveEgg(snake, egg)){
            snake.snakeGrowUp();
            egg.flushed();
        }
        // 判断是否撞墙
        if (snake.isArriveWall()) {
            endGame(app,snake);
        } else {
            render(app, snake, egg);
        }
    }, Math.floor(1000 / 5));
}
function render(app, snake, egg) {
    const snakeTemplate = snake.render();
    const eggDom = egg.render();
    app.innerHTML = snakeTemplate;
    app.appendChild(eggDom);
}

function endGame(App,snake) {
    timer && clearInterval(timer);
    const div = document.createElement('div');
    div.innerHTML = `<div class="cover">
        <div class="content">游戏结束，得分${snake.snakeBody.length - 3}</div>
    </div>`;
    const endGameDom = div.children[0];
    App.parentNode.appendChild(endGameDom);
    endGameDom.addEventListener('click', () => {
        App.parentNode.removeChild(endGameDom);
        init(App);
    });
}


