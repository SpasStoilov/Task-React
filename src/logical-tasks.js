function primeDividers(n){       
    let allPrimes=[];

    for (let x=2; x <= n; x++){
        let isPrime = true
    
        for (let y=2; y <= x; y++){
            if (x % y == 0 & x !== y){
                isPrime = false
                break
            }
        }
        
        if (isPrime && n % x == 0){
            allPrimes.push(x)
        }
         
    }
   
    console.log(allPrimes.join(", "))
}


primeDividers(15)
primeDividers(11)
primeDividers(12)


function validateBrackets(str){   

    let allKinds = str.split("").filter(chr => "{}[]()".includes(chr))

    let dictBrackets = {
        '{': ['}', "{[("],
        '[': [']', "[("],
        '(': [')', "("],
    }

    let f = 0
    let s = 1
    let result = true

    while (allKinds.length > 0){
        let firstChr = allKinds[f]
        let secChr = allKinds[s]

        if(dictBrackets[firstChr] && dictBrackets[firstChr][0] == secChr){
            
            allKinds.splice(f, 2)
            if (f != 0){
                 f--
                 s--
            } 
            
        }
        else if (dictBrackets[firstChr] && dictBrackets[firstChr][1].includes(secChr)){
            f++
            s++
        }
        else {
            result = false
            break
        }
            
    }

    return result

}


console.log(validateBrackets('{asd}'))
console.log(validateBrackets('{[(asd)]}'))
console.log(validateBrackets('[{asd}]'))
console.log(validateBrackets('[(asd])'))
console.log(validateBrackets('{aaa[bbb(ccc)ddd]eee}'))