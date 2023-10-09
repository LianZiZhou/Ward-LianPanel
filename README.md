# Ward-LianPanel
## Lian Ward

## 1.部署
本应用分为前端和后端，需要分别部署，且前端服务器应可以访问到后端服务器。
### 1.1.后端部署
后端为稍作修改的原版Ward，用于提供兼容的元数据。（修改以支持网络统计）
1. 下载 /customWard/lian-ward-backend-2.0.0.jar 
2. 运行 `java -jar lian-ward-backend-2.0.0.jar` 并按配置原版Ward的方式配置Ward后端
3. 记录Ward后端的URL，该URL应可以被前端连接。
### 1.2.前端部署
前端由NodeJS和Express框架构建，读取配置文件后每秒向后端请求数据，将数据缓存转换为前端请求的JSON API和WebSocket API。
克隆本仓库并整备环境和配置文件
```shell
git clone https://github.com/LianZiZhou/Ward-LianPanel.git
cd Ward-LianPanel
npm install
cp config.example.json config.json
cp .env.example .env
#如果未安装PM2请执行下面的命令安装
npm install pm2 -g
```
### 1.2.1.前端配置文件
config.json 中
`site` 对象的 `title` 和 `description` 属性会用以替换对应HTML中的变量，请按需修改。
`backend` 对象的 `url` 属性应填入Ward后端的URL，`id` 用作URL标识符，`name` 用作显示名称。
.env 中
`PORT` 为前端服务的监听端口，`NODE_ENV` 为服务运行环境，`debug` 模式会将错误信息暴露给前端用户，请酌情启用。
## 2.反向代理
如需反向代理，请确保代理后可以向 `/api/socket` 正常发起WebSocket连接。
