const keywords = require('./keywords')
// 是否空格
const isSpace = s => /\s/.test(s) 

// 是否关键字
const isKeyword = s => keywords.has(s)
// 是否中文
const isChinese = s => /[\u4e00-\u9fa5]/.test(s)
// 是否数字
const isNum = s => /[0-9]/.test(s)


/**
 * 词法解析 将原始代码解析为tokens
 * @param {String} code 
 * @returns {Array}
 */
function tokenizer(code){
  const len = code.length
  let index = 0
  const tokens = []
  while(index < len){
    let str = code[index]
    if(isSpace(str)){
      index++
      continue
    }
    /**
     * 中文连续字符 >= 1
     * 可能是关键字 也可能是自定义变量 字符
     */
    if(isChinese(str)){
       let value = ''
       while(isChinese(str)){
           value += str
           str = code[++index]
       }
       // 判断是关键字还是变量
       if(isKeyword(value)){
          tokens.push(keywords.get(value))
       }else{
         tokens.push({type:'variable',name:value,value})
       }
    }

    /**
     * 数字
     */
    if(isNum(str)){
      let value = ''
      while(isNum(str)){
        value += str
        str = code[++index]
      }
      tokens.push({type:'number',value:Number(value)})
    }
    if(str === ':'){
       tokens.push({type:'equalSign',name:'equalSign'})
       index++
       continue
    }
    if(str === ','){
      tokens.push({type:'add'})
      index++
      continue
    }
    if(str === ';'){
      tokens.push({type:'lineEnd'})
      index++
      continue
    }
    if(str === '('){
      tokens.push({type:'paren',value:"("})
      index++
      continue
    }
    if(str === ')'){
      tokens.push({type:'paren',value:')'})
      index++
      continue
    }
    if(str === "{"){
      tokens.push({type:'midParen',value:"{"})
      index++
      continue
    }
    if(str === "}"){
      tokens.push({type:'midParen',value:"}"})
      index++
      continue
    }
  
    index++
  }
  return tokens
}

module.exports = tokenizer