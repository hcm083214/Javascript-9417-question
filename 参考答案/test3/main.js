function init(el) {
    shape = el.querySelector('.rectangle');
    design = el.querySelector('.design');
    movingEle = el.querySelector('#moving');
    drag(shape, movingEle, design);
}

function drag(triggerEle, movingEle, destinationEle) {
    const target = { el: null };
    const handleMouseUp = function (e) {
        document.removeEventListener('mousemove', handleMouseMove)
        e.stopPropagation();
        if (arrive(destinationEle, movingEle)) {
            console.log('arrive')
            const node = cloneAttribute(movingEle, document.createElement('div'));
            destinationEle.appendChild(node);
        }
        movingEle.setAttribute('class', '');
    }
    const handleMouseMove = function (e) {
        const { width, height, el } = target;
        el.style = `left:${e.pageX - width / 2}px;top:${e.pageY - height / 2}px;`
        e.stopPropagation();
    }
    const cloneAttribute = function (source, target) {
        target.classList.add(source.classList[0]);
        const { left, top, } = getEleBoundingClientRect(source);
        target.style = `left:${left}px;top:${top}px`;
        return target;
    }
    triggerEle.addEventListener('mousedown', (e) => {
        console.log('mousedown',e.target)
        target.el = cloneAttribute(e.target, movingEle);
        const { left, top, width, height } = getEleBoundingClientRect(e.target);
        Object.assign(target, { left, top, width, height });
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.stopPropagation();
        e.preventDefault();
    },true);
}
/**
 * @description: 判断拖拽中的元素是否到达指定的元素内部
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

