const incantations = "芝麻开门";
function init(el) {
    document.querySelector('.wrapper .btn').addEventListener('click', () => {
        mPrompt().then(res => {
            console.log(res);
            if(res === incantations){
                document.querySelectorAll('#door .doors')[0].classList.add('door-left');
                document.querySelectorAll('#door .doors')[1].classList.add('door-right');
            }
        }).catch(err => {
            console.log(err)
        })
    })
}
/**
 * @description: 调用函数，开启弹窗，记录输入框的内容，并通过 promise 异步返回输入框中的内容
 * @return {Promise} 
 */
function mPrompt() {
    // template 保存的是弹窗的结构字符串，可以先转化为 DOM 再通过 appendChild 方式插入到 body 中
    const template = `
        <div class="modal">
            <div class="message-box">
                <div class="message-header">请输入咒语</div>
                <div class="message-body">
                    <input type="text">
                </div>
                <div class="message-footer">
                    <button class="btn btn-small" id='cancel'>取消</button>
                    <button class="btn btn-small btn-primary" id='confirm'>确定</button>
                </div>
            </div>
        </div>
    `;
    const div = document.createElement('div');
    // 请在下方补充代码完成要求的功能
}