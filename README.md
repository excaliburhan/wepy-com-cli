# wepy-com-cli
wepy组件导入工具

## 安装

> npm install -g wepy-com-cli

## 使用

### 查看目前支持的列表

> wepycom ls

### 添加组件

`dir-name`可以缺省，缺省时文件夹名字为下载的repo名

> wepycom add name dir-name

也可以使用自己的github仓库作为下载源，推荐使用组织进行管理，比较干净整洁

> wepycom add owner/name dir-name

其他源，如`gitlab`或`bitbucket`可以参照：[https://github.com/flipxfx/download-git-repo](https://github.com/flipxfx/download-git-repo)

### 配置文件

默认组件下载源：[wepy-com-templates](https://github.com/wepy-com-templates)
默认组件下载目录：当前执行目录的`src/components`

你可以在执行目录创建一个`wepy-com-config.json`文件，来进行自定义

```
{
  "user": "wepy-com-templates",
  "dir": "src/components"
}
```

## 开发

wepy组件开发只要遵循wepy的开发规范即可，上传到git仓库的应该是`*.wpy`这样的源文件
当然，你可以添加`README.md`或`readme.md`文件作为使用文档，使用`wepy-com-cli`下载组件会自动删除这两个md文件

欢迎大家给 [wepy-com-templates](https://github.com/wepy-com-templates) 这个仓库提交常用的wepy组件
