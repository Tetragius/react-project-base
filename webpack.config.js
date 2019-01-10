const buildDev = require('./webpack/dev-webpack.config');
const buildModule = require('./webpack/module-webpack.config');
const merge = require('webpack-merge');

const root = __dirname;

const defineBuild = env => {
    if(env.development){
        return buildDev(root);
    }
    if(env.module){
        return buildModule(root);
    }
}

module.exports = env => merge(
    {}, 
    defineBuild(env)
);