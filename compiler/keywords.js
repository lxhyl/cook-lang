const keywords = new Map()

const keywordsArr = [
  {type:'defineVariable',name:'食材'},
  {type:'print',name:'打印'}
]

keywordsArr.forEach(item => keywords.set(item.name,item))


module.exports = new Map(keywords)