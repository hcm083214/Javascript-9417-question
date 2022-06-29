// 使用 promise + setTimeout 模拟网络请求和结果返回
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
        let lens = this.requestQueue.length;
        if(!lens) return
        let min = Math.min(this.max, lens);
        for (let i = 0; i < min; i++) {
            this.max--;
            let request = this.requestQueue.shift();
            request().then(res => {
                console.log('success',res)
            }).catch(err => {
                console.log('fail',err)
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

