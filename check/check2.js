const {getType} = require('./main.js')
const testArr = ['s', 0, false, undefined, Symbol(), function () { }, 123n, null, {}, [], new Date, new Map, new Set, /a/];
const result = testArr.map(item => getType(item));
const resultRequire = [
    'string', 'number',
    'boolean', 'undefined',
    'symbol', 'function',
    'bigint', 'Null',
    'Object', 'Array',
    'Date', 'Map',
    'Set', 'RegExp'
];
let lens = resultRequire.length
for(let i=0;i<lens;i++){
    if(result[i]!==resultRequire[i]){
        console.log('测试不通过');
        process.exit(1);
    }
    if(i==lens-1 && result[i]===resultRequire[i]){
        console.log('测试通过');
    }
}


