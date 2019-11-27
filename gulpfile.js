const   {src, dest, series, parallel, watch}     = require('gulp'),
        autoprefixer    = require('autoprefixer'),
        postcss         = require('gulp-postcss'),
        cssnano         = require('cssnano'),
        uglify          = require('uglify-js'),
        nodemon         = require('nodemon'),
        browserSync     = require('browser-sync');
    

const   baseDir      = './app'
        htmlSrcGlob  = baseDir + '/views/**/*.html', 
        cssSrcGlob   = baseDir + '/public/**/*.css',
        cssDistGlob  = './dist/app/public',
        jsSrcGlob    = baseDir + '/public/**/*.js',
        jsDistGlob   = './dist/app/public';

// build tasks
function cssStyles(){
    return src(cssSrcGlob)
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(dest(cssDistGlob));
};

function jsCompile(){
    return src(jsSrcGlob)
    .pipe(uglify())
    .pipe(dest(jsDistGlob));
};

/*  
    Nodemon config:
    - watch core server file(s) that require server restart on change
    - changes in js files in the public are handled seperately in jsTask 
    - browser-sync delay to account for server loading time
  */
 function startNodemon(cb) {
    let called = false;
    return nodemon({
        script: baseDir + '/index.js',
        watch:  baseDir + '/**/*.js',
        ignore: baseDir + '/public'
    })
    .on('start', function onStart() {
        // ensure start only got called once
        if (!called) { cb(); }
        called = true;
    })
    .on('restart', function onRestart() {
        // reload connected browsers after a slight delay
        console.log('Restarting server...');
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 2000);
    });
};

//  browser-sync
function startBrowserSync (){
    browserSync({
      // proxy the expressjs app and use a different port 
      proxy: 'http://localhost:3000',
      port: 4000,
      files: [cssSrcGlob, jsSrcGlob, htmlSrcGlob],   //  watch main files for changes
    });
};

exports.watch = series(startNodemon, startBrowserSync);
exports.build = series(cssStyles, jsCompile);