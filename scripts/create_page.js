let fs = require('fs')
let { join } = require('path')
let _ = require('lodash')
let path = process.argv[2]

var storePath = _.lowerFirst(path)

let getRelativeDir = (path) => join(__dirname, path)

if (!fs.existsSync(getRelativeDir(`../src/pages/${path}`)))
  fs.mkdirSync(getRelativeDir(`../src/pages/${path}`))

fs.writeFile(getRelativeDir(`../src/pages/${path}/page.tsx`),
  `import * as React from 'react'
import store from '@/stores/${storePath}/store'
import action from '@/stores/${storePath}'
class ${path} extends React.Component{
  public render():JSX.Element{
    return (
      <div>
      </div>
     )
   }
 }

export default ${path}
`,
  function (err) {
    if (err) {
      console.log(`page/${path}/page.tsx 文件创建失败：` + err)
    } else {
      console.log(`page/${path}/page.tsx 文件创建成功`)
    }
  }
)

if (!fs.existsSync(getRelativeDir(`../src/stores/${storePath}`)))
  fs.mkdirSync(getRelativeDir(`../src/stores/${storePath}`))

fs.writeFile(getRelativeDir(`../src/stores/${storePath}/index.ts`),
  `import { action } from 'mobx'
import store , { Store } from './store'

class ${path}Action{
  store:Store
  constructor(store: Store){
    this.store = store
  }
}

export default new ${path}Action(store)
`,
  function (err) {
    if (err) {
      console.log(`src/stores/${storePath}/index.ts 文件创建失败：` + err)
    } else {
      console.log(`src/stores/${storePath}/index.ts 文件创建成功`)
    }
  }
)

fs.writeFile(getRelativeDir(`../src/stores/${storePath}/store.ts`),
  `import { observable , computed } from 'mobx'
import BaseStore from '../baseStore'

export class Store extends BaseStore{

}
export default new Store()
`,
  function (err) {
    if (err) {
      console.log(`src/stores/${storePath}/store.ts 文件创建失败：` + err)
    } else {
      console.log(`src/stores/${storePath}/store.ts 文件创建成功`)
    }
  }
)