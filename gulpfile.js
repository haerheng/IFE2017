const gulp = require('gulp')
const browerSync = require('browser-sync').create()
const reload = browerSync.reload
const sass = require('gulp-sass')
var serFlag = false
gulp.task('reload', function() {
    
    if(serFlag)
        setTimeout(reload,300)
        // reload();
})
gulp.task('sass', function() {
    gulp.src('./!(node_modules)/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(''))
})
gulp.task("ser", function () {
    gulp.watch("./!(node_modules)/**/*+(html|js|css)",['reload'])
    gulp.watch("./!(node_modules)/**/*.scss",['sass'])
    browerSync.init({
        server: {
            baseDir: "./"
        }
    })
    serFlag = true

    
})