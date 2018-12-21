const buildDev = require('./webpack/dev-webpack.config');
const buildProd = require('./webpack/prod-webpack.config');
const merge = require('webpack-merge');

const root = __dirname;

const defineBuild = env => {
    if(env.development){
        return buildDev(root);
    }
    else{
        return buildProd(root);
    }
}

module.exports = env => merge(
    {}, 
    defineBuild(env)
);