function mentalMethod(...args) {
    // TODO 
    // 补充代码，使得 `mentalMethod('峨眉')('武当')('少林')();
    // mentalMethod('峨眉','武当')('少林')(); mentalMethod('峨眉','武当','少林')();`
    // 结果均返回 `'战胜峨眉,武当,少林'`。

}
console.log(mentalMethod('峨眉')('武当')('少林')());
console.log(mentalMethod('峨眉', '武当')('少林')());
console.log(mentalMethod('峨眉', '武当', '少林')());
module.exports = {
    mentalMethod
}
