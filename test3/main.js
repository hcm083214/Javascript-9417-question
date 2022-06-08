function init(el) {
    // 获得箱子
    const box = el.querySelector('.rectangle');
    // 获得箱子需要搬送到的存放区
    const design = el.querySelector('.design');
    // 获得搬送中的箱子
    const movingEle = el.querySelector('#moving');
    // 搬箱子
    drag(box, movingEle, design);
}
/**
 * @description: 鼠标左键单击箱子，按住不动，将箱子搬送到指定区域，未到指定区域箱子自动回到起始位置
 * @param {Element} triggerEle 代表箱子的元素
 * @param {Element} movingEle 代表移动中的箱子
 * @param {Element} destinationEle 代表箱子需要搬送到的存放区
 */
function drag(triggerEle, movingEle, destinationEle) {
    // 请在函数体中完善挑战内容的要求

}
/**
 * @description: 判断拖拽中的元素是否到达指定的区域
 * @param {Element} destination 需到达的元素
 * @param {Element} moving 拖拽中的元素
 * @return {boolean} 
 */
function arrive(destination, moving) {
    let isArrive = false;
    const { left: dLeft, top: dTop, right: dRight, bottom: dBottom } = getEleBoundingClientRect(destination);
    const { left: mLeft, top: mTop, right: mRight, bottom: mBottom } = getEleBoundingClientRect(moving);
    if (mLeft > dLeft && mTop > dTop && mRight < dRight && mBottom < dBottom) {
        isArrive = true;
    }
    return isArrive;
}
/**
 * @description: 返回元素的大小及其相对于视口的位置
 * @param {Element} ele 传入的元素
 * @return {DOMRect}
 */
function getEleBoundingClientRect(ele) {
    return ele.getBoundingClientRect()
}

