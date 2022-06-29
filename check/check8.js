const { requestControl } = require('./main.js');
// 本地环境
//const { requestControl } = require('../test8/main.js');
let i = 0;
function isResultExpecting(expect, result) {
    let isPass = false
    if (expect == result) {
        console.log(`第${i}次符合预期`)
        isPass = true;
    } else {
        console.log('测试不通过', expect, result);
        isPass = false;
        process.exit(1);
    }
    return isPass;
}

const timer = setInterval(() => {
    let lens = requestControl.requestQueue.length;
    i == 0 && isResultExpecting(15, lens);
    i == 1 && isResultExpecting(5, lens);
    i == 2 && isResultExpecting(0, lens);
    i++;
    lens === 0 && (clearInterval(timer));
}, 3000)
