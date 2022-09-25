// 使用 promise 模拟请求 + 3000ms后完成得到发射后结果
function createRequest(i) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() >= 0.05) {
                    resolve(`第${i}曲率飞船达到光速，成功逃离`);
                } else {
                    reject(`第${i}曲率飞船出现故障，无法达到光速`);
                }
            }, 3000)
        })
    }
}

class RequestControl {
    constructor({ max }) {
        this.max = max;
        this.requestQueue = [];
        setTimeout(() => {
            this.requestQueue.length > 0 && this.run();
        })
        this.startTime = Date.now();
    }
    addRequest(request) {
        this.requestQueue.push(request);
    }
    async run() {
        // todo 控制同一时间可以发起最大的最大请求数 = max,每发送一次请求占用一次发起次数，当 max 值为0时所有请求已完成发送
        let newA = fenge(this.requestQueue, this.max);
        for (let i = 0; i < newA.length; i++) {
            await Promise.allSettled(newA[i].map(item => item.call())).then(res => {
                console.log(res.map(item => item.value ? `success ${item.value} ${Date.now()-this.startTime}` : `fail ${item.reason}`).toString().replace(/\,/g, '\n'))
            });
        }

    }
}
// arr是原数组，N是想分成多少个
function fenge(arr, N) {
    // console.log(arr, N)
    var result = [];
    for (var i = 0; i < arr.length; i += N) {
        result.push(arr.slice(i, i + N));
    }
    return result;
}
const requestControl = new RequestControl({ max: 10 })
for (let i = 0; i < 25; i++) {
    const request = createRequest(i);
    requestControl.addRequest(request);
}
module.exports={
    requestControl
}
