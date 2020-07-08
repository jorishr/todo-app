const   {src, dest, series, parallel, watch}     = require('gulp'),
        autoprefixer    = require('autoprefixer'),
        postcss         = require('gulp-postcss'),
        cssnano         = require('cssnano'),
        uglify          = require('gulp-uglify'),
        nodemon         = require('nodemon'),
        gulpMinHtml     = require('gulp-minify-html'),
        babel           = require('gulp-babel'),
        del             = require('del'),
        browserSync     = require('browser-sync');

const   baseDir      = './app',
        distDir      = './dist',
        htmlSrcGlob  = baseDir + '/views/**/*.html', 
        htmlDistGlob = distDir + '/views',
        cssSrcGlob   = baseDir + '/public/**/*.css',
        cssDistGlob  = distDir + '/public',
        jsSrcGlob    = baseDir + '/public/**/*.js',
        jsDistGlob   = distDir + '/public';

// build tasks

async function startClean(){
    const deletedPaths = await del('./dist');
    console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
};

function copyEnv(){
    return src('./*.env')
    .pipe(dest(distDir));
};

function cssStyles(){
    return src(cssSrcGlob)
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(dest(cssDistGlob));
};

function jsCompile(){
    return src(jsSrcGlob)
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(dest(jsDistGlob));
};

function buildApp(){
    return src(['./app/index.js', './app/helpers/*.js', './app/models/*.js', './app/routes/*.js'], {base: './app/'})
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(dest(distDir));
};

function minifyHtml(){
    return src (htmlSrcGlob)
    .pipe(gulpMinHtml())
    .pipe(dest(htmlDistGlob));
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
        script: baseDir + '/bin/www.js',
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
      files: [cssSrcGlob, jsSrcGlob, htmlSrcGlob]   //  watch main files for changes
    });
};

exports.watch = series(startNodemon, startBrowserSync);
exports.build = series(startClean, parallel(copyEnv, cssStyles, jsCompile, minifyHtml, buildApp));