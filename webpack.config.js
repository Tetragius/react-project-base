const buildDev = require('./webpack/dev-webpack.config');
const merge = require('webpack-merge');

const root = __dirname;

const defineBuild = env => {
    if(env.development){
        return buildDev(root);
    }
}

module.exports = env => merge(
    {}, 
    defineBuild(env)
);