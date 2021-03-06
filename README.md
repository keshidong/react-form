# react-form
解决了在react框架内，form表单的校验事件的通知问题和表单数据获取问题.

目的为了让表单自身管理数据和校验，外层只是通知和获取数据。


这是一个特别有用的React组件，用于解决表单校验和表单数据获取的问题。

## 解决的问题有：
1. 表单比较大，表单数据不想统一托管在一处，目的为了让表单自身管理数据和校验，通过暴露出方法让外部通知表单校验和获取表单数据。
2. 解决表单嵌套的问题。

## 2个接口：
1. launchValidate 可以发起校验，让内层嵌套的表单按React装载的顺序依次校验，当然如果校验函数```return true```就停止继续校验。
2. getValue 可以获取表单数据，按照表单的组织结构返回对象。

## 为组件注册校验函数onValidate 和 注册数据获取函数 setValue
只有注册onValidate 和 setValue 才能被上层组件执行。

## 值得注意的是：
只要注册了onValidate，校验就不会再通知下层组件。

只要注册了setValue，获取数据就不会再去组织获取下层组件的表单数据。
