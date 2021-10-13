
<h1>**基金风险管理系统</h1>
</div>

## 安装使用

- 开发环境
```bash
本地环境需要安装 Yarn1.x、Node.js(14.x及以上) 
```
- 安装依赖

```bash
yarn install
```

- 运行

```bash
yarn serve
```

- 打包

```bash
yarn build
```

## 目录说明
     ├── build # 打包脚本相关
     │   ├── config # 配置文件
     │   ├── generate # 生成器
     │   ├── script # 脚本
     │   └── vite # vite配置
     ├── mock # mock文件夹
     ├── public # 公共静态资源目录
     ├── src # 主目录
     │   ├── api # 接口文件
     │   ├── assets # 资源文件
     │   │   ├── icons # icon sprite 图标文件夹
     │   │   ├── images # 项目存放图片的文件夹
     │   │   └── svg # 项目存放svg图片的文件夹
     │   ├── components # 公共组件
     │   ├── design # 样式文件
     │   ├── directives # 指令
     │   ├── enums # 枚举/常量
     │   ├── hooks # hook
     │   │   ├── component # 组件相关hook
     │   │   ├── core # 基础hook
     │   │   ├── event # 事件相关hook
     │   │   ├── setting # 配置相关hook
     │   │   └── web # web相关hook
     │   ├── layouts # 布局文件
     │   │   ├── default # 默认布局
     │   │   ├── iframe # iframe布局
     │   │   └── page # 页面布局
     │   ├── locales # 多语言
     │   ├── logics # 逻辑
     │   ├── main.ts # 主入口
     │   ├── router # 路由配置
     │   ├── settings # 项目配置
     │   │   ├── componentSetting.ts # 组件配置
     │   │   ├── designSetting.ts # 样式配置
     │   │   ├── encryptionSetting.ts # 加密配置
     │   │   ├── localeSetting.ts # 多语言配置
     │   │   ├── projectSetting.ts # 项目配置
     │   │   └── siteSetting.ts # 站点配置
     │   ├── store # 数据仓库
     │   ├── utils # 工具类
     │   └── views # 页面
     ├── types # 类型文件
     ├── vite.config.ts # vite配置文件
     └── windi.config.ts # windcss配置文件
     