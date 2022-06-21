/* 
    id:表示当前数据的id
    pid:表示数据的父级id
    title:表示标题名称
*/
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

/*  数据转换后的格式如下：
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
*/

function translateData(data) {
    const map = {};
    data.forEach(item => {
        map[item.id] = item
    });
    const result = [];
    data.forEach(item => {
        const parent = map[item.pid];
        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item)
        } else {
            result.push(item)
        }
    })
    return result
}
function render(data, root) {
    data.forEach(item => {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.innerText = item.title;
        details.appendChild(summary);
        root.appendChild(details);
        if (item.children && item.children.length > 0) {
            render(item.children, details)
        } 
    })
}
function init(data, root) {
    const dataFormat = translateData(data);
    render(dataFormat, root);
}

module.exports = {
    translateData
} 

