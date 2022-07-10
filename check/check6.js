const {mentalMethod} = require('./main.js');
// 本地测试
// const { mentalMethod } = require('../test6/main.js');
let result = '战胜峨眉,武当,少林';
const result1 = mentalMethod('峨眉')('武当')('少林')();
const result2 = mentalMethod('峨眉','武当')('少林')();
const result3 = mentalMethod('峨眉','武当','少林')();
if (result1 === result && result2 === result && result3 === result) {
    console.log('测试通过');
} else {
    console.log('测试不通过');
    process.exit(1);
}