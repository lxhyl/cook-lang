/**
 * 解析器 将tokens转为抽象语法树AST
 * @param {Array} tokens 
 */

function parser(tokens) {
  const len = tokens.length
  let index = 0
  function parse() {
    let token = tokens[index]
    // 不含括号时说明没有字节点，是平行关系
    if (token.type !== 'paren') {
      index++
      return token
    } else { // 处理括号里面的
      if (token.value === '(') {
        token = tokens[++index]
      }
      
      const node = {
        type: 'callExpression',
        name: token.value,
        params: []
      }
      // 遇到左括号或其他
      while (token.value !== ')') {
        node.params.push(parse())
        token = tokens[index]
        if (!token) break
      }
      index++
      console.log('token',token)
      return node
    }
  }
  const ast = {
    type: 'Program',
    body: []
  }
  while (index < len) {
    ast.body.push(parse())
  }
  return ast
}

module.exports = parser