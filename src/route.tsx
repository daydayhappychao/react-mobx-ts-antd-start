import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import Bundle from './Bundle';
import PageLayout from './layouts/PageLayout'

// 异步加载组件方法
const getPage = (page: string) => (
  <Bundle load={require(`bundle-loader?lazy!./pages/${page}/page.tsx`)}>
    {Component => <Component />}
  </Bundle>
)



//路由
const app = () =>
  <div style={{ height: '100%' }}>
    <PageLayout>
      <div style={{ padding: '10px', overflow: 'auto', height: 'calc(100% - 50px)' }}>
        {
          routes.map((v, k) => {
            let path = v.replace(/([A-Z])/g, "_$1").replace(/\_/, '/').toLowerCase()
            if (path === '/home') path = '/'
            console.log(path)
            return <Route exact path={path} key={k} component={() => getPage(v)} />
          })
        }
      </div>
    </PageLayout>
  </div>



export default function () {
  // 用来判断本地浏览器是否支持刷新
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div style={{ height: '100%' }}>
        {app()}
      </div>
    </BrowserRouter>

  );
}