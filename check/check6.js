// const {getResult} = require('./main.js');
// 本地测试
const { getResult } = require('../test6/main.js');

const result1 = getResult(1)(2)(3)();
const result2 = getResult(1, 2)(3)();
const result3 = getResult(1, 2, 3)();
if (result1 === 6 && result2 === 6 && result3 === 6) {
    console.log('测试通过');
} else {
    console.log('测试不通过');
    process.exit(1);
}