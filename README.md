## 一、项目描述

UCCSIT项目前端界面


1.  [Vue 官方文档](https://cn.vuejs.org/v2/guide/instance.html)
2.  [DataV 官方文档](http://datav.jiaminghi.com/guide/)
3.  [echarts 实例](https://echarts.apache.org/examples/zh/index.html)，[echarts API 文档](https://echarts.apache.org/zh/api.html#echarts)


## 二、主要文件介绍

| 文件                | 作用/功能                                                              |
| ------------------- | --------------------------------------------------------------------- |
| main.js             | 主目录文件，引入 Echart/DataV 等文件                                    |
| utils               | 工具函数与 mixins 函数等                                                |
| views/ index.vue    | 项目主结构                                                             |
| views/其余文件       | 界面各个区域组件（按照位置来命名）                                       |
| assets              | 静态资源目录，放置 logo 与背景图片                                       |
| assets / style.scss | 通用 CSS 文件，全局项目快捷样式调节                                      |
| assets / index.scss | Index 界面的 CSS 文件                                                  |
| components/echart   | 所有 echart 图表（按照位置来命名）                                      |
| common/...          | 全局封装的 ECharts 和 flexible 插件代码（适配屏幕尺寸，可定制化修改）     |

## 三、使用介绍

### 启动项目

```
yarn or npm i
```

```
yarn serve or npm run serve
```

### 文件缩写
| 缩写              | 中英全称                                                         |
| :-----------------: | :-------------------------------------------------------------------: |
| TCP          | Traffic Condition Perception 交通路况感知 |
| TRF           | Traffic Real-time Forecast 交通实时预测 |
| TCG  |    TrafficControlGuidance 交通调控引导    |
| ISP  |   InfrastructurePlanning  基础设施规划    |
|      |                                           |
|      |                                           |
|      |                                           |
|      |                                           |
|      |                                           |

## 四、更新情况

1. 增加了 Echart 组件复用的功能，如：中间任务达标率的两个百分比图使用的是同一个组件。
2. 修复了头部右侧的图案条不对称的问题。
3. 修复屏幕适配问题，更换了所有的尺寸单位，统一使用 rem。
4. 使用 Mixins 注入图表响应式代码。
5. vue-awesome 改成按需引入的方式。
6. 封装渲染函数，抽离了数据使逻辑更加清晰。
7. 新增地图组件，并添加自动轮播功能

## 五、其余

这个项目是个人的作品，难免会有问题和 BUG，如果有问题请进行评论，我也会尽力去更新，自己也在前端学习的路上，欢迎交流，非常感谢！