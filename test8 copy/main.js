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
    run() {
        debugger
        // todo 控制同一时间可以发起最大的最大请求数 = max,每发送一次请求占用一次发起次数，当 max 值为0时所有请求已完成发送
        let lens = this.requestQueue.length;
        if(!lens) return
        let min = Math.min(this.max, lens);
        for (let i = 0; i < min; i++) {
            this.max--;
            let request = this.requestQueue.shift();
            request().then(res => {
                console.log('success',res,Date.now()- this.startTime)
            }).catch(err => {
                console.log('fail',err,Date.now()- this.startTime)
            }).finally(() => {
                this.max++;
                this.run();
            })
        }
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

