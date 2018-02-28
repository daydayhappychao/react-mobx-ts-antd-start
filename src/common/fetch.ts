import axios from 'axios'


export default (urlHead?: string) => (urlEnd?: string, method: 'get' | 'post' | 'delete' | 'put' = 'get') => (parms?: Object) => {
  const fun: Function = axios[method]
  return fun((urlHead || '') + (urlEnd || ''), method === 'get' ? { parms: parms || {} } : (parms || '')) as Promise<any>
}