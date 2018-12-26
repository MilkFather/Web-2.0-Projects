# 使用前必读

## 标准测试流程
1. 安装好mongodb，Windows环境下请参阅[这里](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)；macOS环境下请参阅[这里](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
2. 安装完毕后，开启一个命令行窗口，运行`mongod`，不要将其关闭
3. 开启另一个命令行窗口，用`node`运行`server.js`
4. 打开 [http://loaclhost:8000](http://localhost:8000)，点击“注册”，输入注册信息
5. 点击“注册”，显示注册成功，网页自动跳转到用户1详情页面
6. 关闭浏览器窗口，再打开一个新的浏览器窗口，访问[http://loaclhost:8000](http://localhost:8000)，自动跳转到用户详情页面
7. 点击“登出”，回到登录界面
8. 关闭浏览器窗口，再打开一个新的浏览器窗口，访问[http://loaclhost:8000](http://localhost:8000)，停留在登录界面
9. 尝试输入错误密码，登录失败
10. 在注册界面尝试注册一个与用户1一样用户名的用户，失败
11. 注册一个新用户2，网页自动跳转
12. 尝试利用网址访问用户1的信息，被拦截
13. 登出，然后关闭浏览器窗口
14. 开启第三个命令行窗口，输入`mongo`，然后输入`use signindb`，然后输入`db.users.find({})`，查看当前记录在系统内的用户，可以看到，密码是加密保存的
15. 输入`db.users.deleteMany({})`，删除所有用户数据
16. 依次结束 `node`、`mongo`和`mongod`，测试结束

## 常见问题
1. 如果在测试前一个同学的时候没有删干净数据，则存在串库的可能，一定要记得从全新环境开始
2. 如果在测试前一个同学的时候没有删掉Cookie，则会导致错误。删除Cookie之后再试一次
3. 不要在浏览器的隐身模式下测试，因为隐身模式下存储的所有Cookie都会在窗口关闭时删除
4. Mongodb默认需要监听端口27017。不要修改这个数字，也不要占用这个端口