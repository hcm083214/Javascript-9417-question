function init(el) {
    document.querySelector('.wrapper .btn').addEventListener('click', () => {
        mPrompt().then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    })
}
function mPrompt() {
    const div = document.createElement('div');
    const template = `
        <div class="modal">
            <div class="message-box">
                <div class="message-header">输入想对未来的自己说的话</div>
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
    div.innerHTML = template;
    document.querySelector('body').appendChild(div.children[0]);
    const asyncQueue = {
        resolve: null,
        reject: null,
    };
    document.querySelector('#cancel').addEventListener('click', () => {
        asyncQueue.reject('false');
        document.querySelector('body').removeChild(document.querySelector('.modal'));

    })
    document.querySelector('#confirm').addEventListener('click', () => {
        const result = document.querySelector('.message-body input').value
        asyncQueue.resolve(result);
        document.querySelector('body').removeChild(document.querySelector('.modal'));
    })
    return new Promise((resolve, reject) => {
        asyncQueue.resolve = resolve;
        asyncQueue.reject = reject;
    })
}