// 使用 promise 模拟网络请求 + setTimeout 模拟服务端相应，3000ms后服务器返回结果
function createRequest(i) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() >= 0.05) {
                    resolve(i);
                } else {
                    reject(i);
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
    }
    addRequest(request) {
        this.requestQueue.push(request);
    }
    run() {
        // todo 控制同一时间可以发起最大的最大请求数 = max,每发送一次请求占用一次发起次数，当 max 值为0时不发送请求

    }
}

const requestControl = new RequestControl({ max: 10 })
for (let i = 0; i < 25; i++) {
    const request = createRequest(i);
    requestControl.addRequest(request);
}
module.exports={
    requestControl
}

