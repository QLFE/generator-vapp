## 快速开始

``` bash
# 安装依赖
npm install

# 开启本地开发服务器，监控项目文件的变化，实时构建并自动刷新浏览器 localhost:8080
npm run dev

# 使用生产环境配置构建项目，构建好的文件会输出到 "dist" 目录
npm run build

# 使用生产环境配置构建项目查看打包代码分析报告
npm run build --report
```

## 目录结构
```shell
├── build # 构建脚本
├── config # 构建脚本配置文件
├── dist # 编译自动生成的部署文件
├── mock # 数据mock
├── node_modules # npm 包
│
├── src # 源文件目录
│   ├── api # api 目录
│   │   ├── index.js # 对外导出
│   │   ├── url-types.js # 所有的url
│   │
│   ├── assets # 资源目录，包括 css、img 等
│   │   ├── img
│   │   ├── scss
│   │   ├── ...
│   ├── components # 公共组件
│   ├── config #配置项
│   ├── libs # 第三方及 utils 工具库
│   ├── routes # 页面路由
│   ├── service # 页面服务
│   ├── store # 状态管理
│   ├── views # 页面view
│   │   ├── home # home页
│   │   │   ├── components # 页面内部组件目录
│   │   │   ├── index.vue # 页面根组件
│   │   │   ├── ...
│   │   ├── ...
│   ├── app.vue # vue 根实例
│   ├── main.js # 入口
│
├── index.html # html 入口文件
├── package.json # 包管理
├── README.md
├── .babelrc # babel 配置文件
├── .editorconfig # 编辑器基础配置同步
├── .eslintrc # eslint 配置文件
├── .postcssrc # postcss 插件配置，包括 autoprefixer、post-pxtorem等
│
```
## 前后端分离
### API 请求抽离
为实现分层，所有的API请求抽离到API目录中
用法如下：
```
# url-types.js 中定义所有的 API 接口
export default {
  user: {
    getProfile: {
        url: '/user/getProfile',
        method: 'post'
    },
    getDetail: '/user/getDetail',
  }
};

/**
* 根据url-types.js 自动生成api接口， 接口为 Promise 形式
*  生成接口有两个参数：
* @param  {Object} params 请求参数
* @param  {Object} config 请求配置-参见 [axios]
*/
import api from '@/api';
api.user.getProfile(params, config).then((data)=>{
})
```
### mock 数据
>   前后端分离后，开发前需要和后端同学定义好接口信息（请求地址，参数，返回信息等），前端通过 mock 的方式，即可开始编码，无需等待后端接口 ready。

我们利用 express 中间件机制添加 mock 功能，在 mock 目录下添加文件， 每个接口对应一个文件, 文件内容如下:
```
module.exports = {
  // 接口地址
  api: '/user/getProfile',
  // 返回数据
  response: {
      status: 1,
      data: {
          name: 'vue'
      }
  }
}
```
在 config 的 dev 中进行开启或关闭
```
dev: {
    env: require('./dev.env'),
    ...
    mock: false // 是否开始数据mock
  }
```
## 移动端适配
>   项目采用 REM 进行适配处理，动态给`<html>`元素添加`font-size`属性，并且动态改写`font-size`的值

我们利用 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 自动进行 px 到 rem 的转换
部分配置项如下， 配置文件位于`.postcssrc.js`：
```
{
    rootValue: 64, # rem 基准值
    unitPrecision: 5, # 小数点位数
}
```
根据拿到的设计稿设置 rem 基准值，目前设计稿主要是 640/750, 对应的基准值是 64/75，在设定好基准值后，我们在css文件直接写对应的设计稿 px 值。
## 组件化
>   设计和完成一个 Web App 之前，最好先构思好如何构建各个组件，哪些组件需要被复用到，哪些页面是要切换的

整个应用通过 Vue 组件的方式搭建，每个页面都可以分解为如图的组件系统
![](https://user-gold-cdn.xitu.io/2016/11/29/d9aae7b58480c50e814d25742ef36eb2.png)
整个 App 的组件树结构如下：
```
├── app.vue # 应用根组件
    ├── view1.vue # 页面级组件，放在views目录里
    │   ├── component1.vue # 功能组件，公用的放在 components 目录，否则放在 views 子目录
    │   ├── component2.vue
    ├── view2.vue
    │   ├── component1.vue
    │   ├── component2.vue
    │
```
## 数据中心化
数据中心化借助 [Vuex](https://github.com/vuejs/vuex) 实现，如果应用较为简单，不推荐使用，可使用 `$root.data` 配合 [global event bus](https://cn.vuejs.org/v2/guide/components.html#非父子组件通信) 来实现。
store 用于处理数据状态读写和同步，以及数据输入输出的格式化处理，vuex 机制如下图所示：
![](https://vuex.vuejs.org/zh-cn/images/vuex.png)，
整个store的结构如下：
```
├── store
    ├── index.js # 组装模块并导出 store 的地方
    ├── actions.js # 根级别的 action
    ├── mutations.js # 根级别的 mutation
    ├── mutation-types.js # 所有的 mutation 常量类型
    ├──modules
    │   ├── qrcode.js # 二维码模块
    │   ├── bank.js # 银行卡模块
    │
```

## 路由
基于[Vue-Router](https://router.vuejs.org/zh-cn/index.html) 的路由实现
整个routes的结构如下：
```
├── routes
    ├── index.js # 组装模块并导出 store 的地方
    ├── home.js # home router
    ├── bank.js # bank router
    │
```
>   为解决打包构建包过大，我们把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，结合 Vue 的异步组 和 Webpack 的 code splitting feature, 来实现路由组件的懒加载。

## 样式规划
我们采用 Sass CSS 预处理器来组织样式文件， 样式主要涉及几个方面：
- 基准样式设置，包括样式重置，变量设置等
- 通用组件样式和mixin等
- 堆叠次序管理

