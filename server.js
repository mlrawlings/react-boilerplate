require('babel/register')

const PRODUCTION = 'production' === process.env.NODE_ENV
const PORT = 8080

var path = require('path')
  , http = require('http')
  , koa = require('koa')
  , koaStatic = require('koa-static')
  , app = koa()
  , server

app.use(koaStatic(path.resolve('./public')))

if(!PRODUCTION) {
	var webpack = require('webpack')
	  , koaWebpackDev = require('koa-webpack-dev')
	  , webpackConfig = require('./webpack.config.js')
	  , compiler = webpack(webpackConfig)

	app.use(koaWebpackDev.middleware(compiler))
} else {
	app.use(koaStatic(path.resolve('./dist')))
}

server = http.createServer(app.callback())

if(!PRODUCTION) {
	koaWebpackDev.hotModuleSocket(server, compiler)
}

server.listen(PORT)