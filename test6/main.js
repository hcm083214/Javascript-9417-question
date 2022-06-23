function getResult(...args) {
    // TODO 补充代码，使得 getResult(1)(2)(3)() getResult(1, 2)(3)() getResult(1, 2, 3)() 结果都为6

}
console.log(getResult(1)(2)(3)());
console.log(getResult(1, 2)(3)());
console.log(getResult(1, 2, 3)());
module.exports = {
    getResult
}
