/*
 * @Author: hcm083214 13723742351@163.com
 * @Date: 2022-06-03 16:04:43
 * @LastEditTime: 2022-06-03 16:04:44
 * @LastEditors: hcm083214 13723742351@163.com
 * @Description: 
 * @FilePath: \蓝桥云课挑战题\test2\main copy.js
 */
/* 
数据类型检测：
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
function getType(data){
    let type = typeof data;
    if(type === 'object'){
        type = Object.prototype.toString.call(data).replace(/^\[object (\S+)\]$/,'$1')
    }
    return type
}

module.exports = {
    getType
}

const testArr = ['s',0,false,undefined,Symbol(),function(){},123n,null,{},[],new Date,new Map,new Set,/a/];
const result = testArr.map(item=>getType(item));
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
