import { observable, action } from 'mobx'


type setInteface = 'loading' | 'modalShow' | 'inputValue'

export default class {
  @observable loadingSet = observable.map(new Map())
  @observable modalShowSet = observable.map(new Map())
  @observable inputValueSet = observable.map(new Map())

  /**
   * 公用修改observable方法
   * 
   * @param {string} key 需要修改的observable
   * @param {*} value 
   */
  @action changeState = (key: string, value: any) => {
    this[key] = value
  }

  /**
   * 公用修改obj类型observable方法
   * 
   * @param {string} obj 需要修改的observable
   * @param {string[]} key 键值
   * @param {any} value 
   */
  @action changeObjState(obj: string, key: string[], value: any) {
    if ((!this[obj]) || (typeof obj !== 'object')) throw new Error(`${obj}不是object类型`)
    let __value = this[obj]
    for (let i = 0; i < key.length; i++) {
      if (i === key.length - 1) __value[key[i]] = value
      else __value = __value[key[i]]
    }
  }
  /**
   * 修改set中的值
   * 
   * @param {setInteface} type 
   * @param {string} key 
   * @param {string} value 
   */
  @action changeSetValue = (type: setInteface, key: string, value: string) => {
    this[type + 'Set'].set(key, value)
  }
  /**
   * 清空一个set
   * 
   * @param {setInteface} type 
   */
  @action clearSet = (type: setInteface) => {
    this[type + 'Set'].clear()
  }

  /**
   * 传入一个loadingSet和一个Promise方法，在执行Promise方法置loading为true，完成后置为false
   * 
   * @param {string} loadingSetKey loadingSet中对应的key值
   * @returns 
   */
  @action fetchWithLoading(loadingSetKey: string) {
    this.loadingSet.set(loadingSetKey, true)
    return (asynchronous: asynchronousInterface) => {
      return asynchronous().then(res => {
        this.loadingSet.set(loadingSetKey, false)
        return res
      }).catch(e => {
        this.loadingSet.set(loadingSetKey, false)
      })
    }
  }
}