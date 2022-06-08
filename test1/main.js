// 在团队开发中，要减少变量相互覆盖的问题，会采用一个对象进行变量收编，但是使用单一对象往往会因为this的指向带来各种问题
// 本题目主要考察的也是this的使用
const data = [{ id: 1, content: '明日方舟' }, { id: 2, content: '明朝' }, { id: 3, content: '明天会更好' }, { id: 4, content: '明星' }, { id: 4, content: 'm' }, { id: 5, content: 'mi' }, { id: 6, content: 'min' }, , { id: 6, content: 'ming' }]
const search = {
    inputEl: null,
    listEl: null,
    data: [],
    init(options) {
        this.initData(options.el);
        this.handle();
    },
    initData(el) {
        //获取页面上的输入框
        this.inputEl = el.querySelector('input');
        //获取页面上的显示项的ul标签
        this.listEl = el.querySelector('.search-list');
    },
    //事件处理函数
    handle() {
        //请在下方补充代码实现以下要求
        //输入框绑定 input 事件，输入'm','mi','min','ming','明'，列表显示相应的搜索项
        
    },
    handleInput(e) {
        const value = e.target.value;
        // 使用定时器模拟 ajax 发送请求，data 接收数据
        setTimeout(() => {
            this.data = !!value ? data.filter(val => val.content.indexOf(value) !== -1) : [];
            this.render();
        })
    },
    render() {
        // 根据得到的数组转化为 li 标签，并插入到 .search-list 元素（ul标签）内
        const template = this.data.reduce((prev, next) => prev + `<li>${next.content}</li>`, '');
        this.listEl.innerHTML = template;
    }
}

