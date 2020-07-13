const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const serve = require('koa-static');
const path = require("path")

// 1.主页静态网页 把静态页统一放到dist中管理
const home   = serve(path.join(__dirname)+'/coverage/recordinfo/');
// 2.默认页
const hello = ctx => {
  ctx.response.body = 'Hello World';
};

// 3.分配路由
app.use(home); 
app.use(route.get('/', hello));
app.listen(3000);

console.log('listening on port 3000');