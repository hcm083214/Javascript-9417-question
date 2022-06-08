/* 
数据类型检测及返回的结果

's' ---> 'string'
0 ---> 'number'
false ---> 'boolean'
undefined ---> 'undefined'
Symbol ---> 'symbol'
function ---> 'function'
123n ---> 'bigint'

null ---> 'Null'
{} ---> 'Object'
[] ---> 'Array'
Date ---> 'Date'
Map --->  'Map'
Set --->  'Set'
RegExp --->  'RegExp'
*/

/**
 * @description: 数据类型检测
 * @param {*} data 传入的待检测数据
 * @return {*} 返回数据类型
 */
function getType(data) {
  //请在函数体中补充代码完成对传入数据进行类型检测

}

module.exports = {
  getType
}

// 示例
const testArr = ['s', 0, false, undefined, Symbol(), function () { }, 123n, null, {}, [], new Date, new Map, new Set, /a/];
const result = testArr.map(item => getType(item));
/*
 [
    'string',  'number',
    'boolean', 'undefined',
    'symbol',  'function',
    'bigint',  'Null',
    'Object',  'Array',
    'Date',    'Map',
    'Set',     'RegExp'
  ]
*/
