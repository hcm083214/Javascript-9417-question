function mentalMethod(...args) {
    return function result(...rest) {
        if (rest.length === 0) {
            return args.reduce(((pre, next,index) => {
                let result='';
                if(index===0){
                    result+=`${pre}${next}`
                }else{
                    result+=`${pre},${next}`
                }
                return result;
                
            }),'战胜');
        } else {
            args.push(...rest);
            return result;
        }
    }
}
module.exports = {
    mentalMethod
}
console.log(mentalMethod('峨眉')('武当')('少林')());
console.log(mentalMethod('峨眉','武当')('少林')());
console.log(mentalMethod('峨眉','武当','少林')());