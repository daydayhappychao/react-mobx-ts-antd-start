import { action } from 'mobx'
import store , { Store } from './store'

class CeShiAction{
  store:Store
  constructor(store: Store){
    this.store = store
  }
}

export default new CeShiAction(store)
