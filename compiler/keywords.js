const keywords = new Map()

const keywordsArr = [
  {type:'defineVariable',name:'食材'},
  {type:'print',name:'打印'},
  {type:'defineFun',name:'食物'},
  {type:'return',name:'制作'}
]

keywordsArr.forEach(item => keywords.set(item.name,item))


module.exports = new Map(keywords)