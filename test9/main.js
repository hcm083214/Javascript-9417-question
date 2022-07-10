async function fn1(next) {
    arrProxy[0] = "看到西瓜";
    await next();
    arrProxy[4] = "装好西瓜";
}
async function fn2(next) {
    arrProxy[1] = "看到芝麻";
    await delay();
    await next();
    arrProxy[3] = "拾起芝麻";
}

function fn3() {
    arrProxy[2] = "掏出麻袋";
}

function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}
const arr = []
const arrProxy = new Proxy(arr, {
    set(arr, index, value) {
        Reflect.set(arr, index, value);
        render();
    }
});


function render() {
    const ul = document.querySelector('ul');
    const template = arr.reduce((pre, next) => pre + `<li>${next}</li>`, '');
    const ulTemp = `<ul>${template}</ul>`;
    ul && (ul.outerHTML = ulTemp);
}


/**
 * @description: middleware 保存需要执行的函数,会执行 fn1 函数若内部有执行 next 方法时，会调用 middleware 注册的函数，
 *               如果被调用的函数中执行 next ，会接着调用下一个注册的函数           
 * @param {Array} middleware 中间件，数组，保存需要执行的函数
 */
function compose(middleware) {
    return function () {
        //1. `compose` 函数接收一个中间件数组 `middleware`，该数组保存需要执行的中间件函数
        //2. `compose` 函数执行会执行中间件数组中的第一个函数
        //3. 第一个函数中有调用 `next` 函数，会执行中间件数组的第二个函数，函数执行完成后会接下来执行第一个函数剩下的代码，如此循环
        // TODO : 

    }
}

const middleware = [fn1, fn2, fn3];
const finalFn = compose(middleware);
finalFn();