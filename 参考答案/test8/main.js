// 使用 promise 模拟请求 + 3000ms后完成得到发射后结果
function createRequest(i) {
    return function () {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            setTimeout(() => {
                if (Math.random() >= 0.05) {
                    resolve(`第${i + 1}曲率飞船达到光速，成功逃离，用时${Date.now() - start}`);
                } else {
                    reject(`第${i + 1}曲率飞船出现故障，无法达到光速，用时${Date.now() - start}`);
                }
            }, 3000 + i * 100)
        })
    }
}

class RequestControl {
    constructor({ max, el }) {
        this.max = max;
        this.requestQueue = [];
        this.el = document.querySelector(el)
        setTimeout(() => {
            this.requestQueue.length > 0 && this.run();
        })
        this.startTime = Date.now();
    }
    addRequest(request) {
        this.requestQueue.push(request);
    }
    run() {
        // todo 控制同一时间可以发起最大的最大请求数 = max,每发送一次请求占用一次发起次数，当 max 值为0时所有请求已完成发送
        let lens = this.requestQueue.length;
        if (!lens) return
        let min = Math.min(this.max, lens);
        for (let i = 0; i < min; i++) {
            this.max--;
            let request = this.requestQueue.shift();
            request().then(res => {
                console.log('success', res)
                this.render(res + `，剩余最多发射数：${this.max + 1}`);
            }).catch(err => {
                console.log('fail', err)
                this.render(err + `，剩余最多发射数：${this.max + 1}`);
            }).finally(() => {
                this.max++;
                this.run();
            })
        }
    }
    render(context) {
        const childNode = document.createElement("li");
        childNode.innerText = context;
        this.el.appendChild(childNode);
    }
}

const requestControl = new RequestControl({ max: 10, el: "#app" })
for (let i = 0; i < 25; i++) {
    const request = createRequest(i);
    requestControl.addRequest(request);
}
module.exports = {
    requestControl
}

