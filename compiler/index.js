const fs = require('fs')
const path = require('path')
const tokenizer = require('./tokenizer')
const parser = require('./parser')
const makeJs = require('./makejs')

const filePath = path.resolve(__dirname,"../source.cook")

const code = fs.readFileSync(filePath,'utf-8')
console.log("sourceCode\n",code)

const codeTokenizer = tokenizer(code)
console.log("codeTokenizer",codeTokenizer)

const codeParse = parser(codeTokenizer)
console.log("codeParse",codeParse)

const codeMakeJs = makeJs(codeParse)
console.log("codeMakeJs",codeMakeJs)

eval(codeMakeJs)