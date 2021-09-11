function makeJs(ast){
  const dfs = node => {
    switch(node.type){
      case 'defineVariable':
        return 'let '
      case 'variable':
        return node.value + ' '
      case 'equalSign':
        return '= '
      case 'number':
        return node.value
      case 'add':
        return ' + '
      case 'lineEnd':
        return '\n'
      case 'print':
        return 'console.log'
      case 'callExpression':
        const params = node.params
        let paramsCode = '('
        for(let i =0;i<params.length;i++){
          paramsCode += dfs(params[i])
        }
        paramsCode += ')'
        return paramsCode
      default:
        return ''
    }
  }
  let code = '\n\n'
  for(let i = 0;i<ast.body.length;i++){
    code += dfs(ast.body[i])
  }
  return code
}

module.exports = makeJs