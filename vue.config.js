const { defineConfig } = require('@vue/cli-service')
const glob = require('glob');
const path = require('path');
const fs = require('fs');

let pages = {};
glob.sync('./src/pages/**/*.js').forEach(function(entry) {
    let tmp = entry.split('/').splice(-3);
    pages[tmp[1]] = {
        entry,
        template: 'public/template.html',
    };
});

let outputDir = path.join(__dirname, 'dist');
// if (fs.existsSync(path.join(__dirname, '..', 'server', 'app.js'))) {
//     outputDir = path.join(__dirname, '..', 'server', 'dist');
// }

module.exports = defineConfig({
    transpileDependencies: true,
    pages: pages,
    filenameHashing: false,
    outputDir: outputDir,
    pluginOptions: {
        i18n: {
            locale: 'ko',
            fallbackLocale: 'ko',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    devServer: {
        port: 3099,
        proxy: {
            
        },
    },
})
