// const {translateData} = require('./main.js');
// 本地测试
const { translateData } = require('../test5/main.js');
const data = [{
    id: 0,
    pid: -1,
    title: "微云"
},
{
    id: 1,
    pid: 0,
    title: "我的文档"
},
{
    id: 2,
    pid: 0,
    title: "我的音乐"
},
{
    id: 2999,
    pid: 1,
    title: "js程序设计"
},
{
    id: 29000,
    pid: 1,
    title: "js权威指南"
},
{
    id: 23333,
    pid: 2,
    title: "王杰"
},
{
    id: 244444,
    pid: 2,
    title: "张国荣"
},
{
    id: 3,
    pid: 2,
    title: "周杰伦"
},
{
    id: 4000,
    pid: 3,
    title: "稻香"
},
{
    id: 4,
    pid: 3,
    title: "发如雪"
},
{
    id: 600,
    pid: 3,
    title: "夜曲"
}];
const dataFormat = translateData(data);
[
    {
        id: 0, pid: -1, title: '微云', children: [
            {
                id: 1, pid: 0, title: '我的文档', children: [
                    { id: 2999, pid: 1, title: 'js程序设计' },
                    { id: 29000, pid: 1, title: 'js权威指南' }
                ]
            },
            {
                id: 2, pid: 0, title: '我的音乐', children: [
                    { id: 23333, pid: 2, title: '王杰' },
                    { id: 244444, pid: 2, title: '张国荣' },
                    {
                        id: 3, pid: 2, title: '周杰伦', children: [
                            { id: 4000, pid: 3, title: '稻香' },
                            { id: 4, pid: 3, title: '发如雪' },
                            { id: 600, pid: 3, title: '夜曲' }
                        ]
                    }
                ]
            }
        ]
    }
]
let isFound = false;
function getDeepFloor(data) {
    data.forEach(item => {
        if (item.id === 3 && item.children.length === 3) {
            isFound = true;
        } else {
            item.children && getDeepFloor(item.children);
        }
    })
}
getDeepFloor(dataFormat);
if (isFound) {
    console.log('测试通过');
} else {
    console.log('测试不通过');
    process.exit(1);
}

