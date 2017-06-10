var gulp = require('gulp'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync').create();

gulp.task('staticBuild',function(){
    gulp.src([
            './src/**/*.html',
            './src/img*/**/*.*'
        ])
        .pipe(gulp.dest('./dist/'))

});

gulp.task('compassBuild',function(){
    gulp.src('./src/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            style: 'compact',
            css: './src/css',
            sass: './src/sass'
        }))
        .on('error',function(err){
            console.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('browserSync', function() {
    var files = [
        '**/*.html',
        '**/*.css',
        '**/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('watch',function(){
    gulp.watch([
        './src/**/*.html',
        './src/**/*.scss'
    ],
        [
            'staticBuild',
            'compassBuild'
        ])
});

gulp.task('default',['staticBuild','compassBuild','watch','browserSync'],function(){});