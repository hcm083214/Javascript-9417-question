async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}

function fn3(next) {
    console.log("fn3");
}

function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}


/**
 * @description: 依次执行中间件的函数。在执行中间件的过程中，如果 next() 立即调用下一个中间件中的函数，
 *               等下一个函数执行完后再执行前一个函数中 next 后面的代码 
 * @param {Array} middleware 中间件，数组，保存需要执行的函数
 */
function compose(middleware) {
    return function () {
        const dispatch = function (i) {
            // 获取中间件中的待执行函数
            const middlewareFn = middleware[i];
            // 将 next 函数作为参数传递给中间件中的待执行函数
            return new Promise((resolve) => {
                resolve(middlewareFn(function next() {
                    // next 函数的作用执行下一个函数
                    return dispatch(i + 1);
                }))
            })
        }
        return dispatch(0);
    }
}

const middleware = [fn1, fn2, fn3];
const finalFn = compose(middleware);
finalFn();