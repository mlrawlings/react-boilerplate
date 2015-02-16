const PRODUCTION = 'production' === process.env.NODE_ENV;

var webpack = require('webpack')

var webpackConfig = module.exports = {
	  entry: { 
	  	  index:'./app/index.js' 
	  }
	, output: { 
		  path:__dirname+'/dist'
		, filename:'[name].js' 
	  }
	, resolve: {
	  	  root: __dirname
	  	, extensions: ['', '.js', '.jsx']
	  }
	, module: {
	  	  loaders: [{ 
	  	  	  test:/\.js(x?)$/
	  	  	, exclude:/node_modules/
	  	  	, loaders:['react-hot', 'babel-loader'] 
	  	  }]
	  }
	, plugins: []
}

if(!PRODUCTION) {
	Object.keys(webpackConfig.entry).forEach(function(name) {
		if(typeof webpackConfig.entry[name] === 'string')
			webpackConfig.entry[name] = [webpackConfig.entry[name]]

		webpackConfig.entry[name].unshift(
			  'webpack-dev-server/client?http://127.0.0.1:8080'
			, 'webpack/hot/only-dev-server'
		)
	})
	webpackConfig.plugins.push(
		  new webpack.HotModuleReplacementPlugin()
		, new webpack.NoErrorsPlugin()
	)
	webpackConfig.watch = true
	webpackConfig.devtool = 'sourcemap'
	webpackConfig.debug = true
}

if(PRODUCTION) {
	webpackConfig.plugins.push(
		  new webpack.optimize.UglifyJsPlugin()
		, new webpack.optimize.DedupePlugin()
	)
}