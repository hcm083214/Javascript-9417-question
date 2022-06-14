function getResult(...args) {
    return function result(...rest) {
        if (rest.length === 0) {
            return args.reduce((pre, next) => pre + next);
        } else {
            args.push(...rest);
            return result;
        }
    }
}
module.exports = {
    getResult
}
console.log(getResult(1)(2)(3)());
console.log(getResult(1, 2)(3)());
console.log(getResult(1, 2, 3)());