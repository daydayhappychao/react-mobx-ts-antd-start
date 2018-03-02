# react-mobx-ts-antd-start  
react+mobx+typescript+antd+axios的start kit项目，开箱即用 
因为mobx真的用起来太简单太爽所以弃用了redux,又因为项目对antd依赖比较高，所以开发了这个react-mobx-ts-antd-start  
在react-mobx-ts-antd-start  中，react+mobx+typescript是高耦合的，antd和axios是可卸载可替换的  
接口相关建议放到src/data目录下，这里啥都没做，需要自己封装个更适用自己的lib级方法  
路由自动根据src/pages目录下的目录生成，驼峰文件名转为下划线，如src/pages/Ceshi目录自动生成路由/ce_shi


tips:
1. 通过npm run addpage XXX来新增page
2. 跑dev服务前可以先执行npm run package 将固定模块打包成package这样可以大幅加快npm start速度
3. qq交流群618290975
4. 喜欢可以star一下，谢谢支持