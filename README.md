# stc-sass

Sass Transpile for StcJS

# Install

    npm install  stc-sass --save-dev

# How to Use

    var sass = require('stc-sass');

    stc.transpile({
      sass: {plugin: sass, include: /\.scss$/, options: {
        sourceMap: true
      }}
    });

# More options

    You can see https://github.com/sass/node-sass#options to get more options.
