var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    uglifycss = require('gulp-uglifycss');

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('js', function() {
    return gulp.src('app/js/common_*.js')
        .pipe(concat('common.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/jquery.min.js',
        'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/animate/wow.min.js',
        'app/libs/parallax/parallax.min.js',
        'app/libs/owl-carousel/owl-carousel/owl.carousel.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('app/js'));
});

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notyfy: false
    });
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['browser-sync', 'js', 'sass', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', ['js']);
});

gulp.task('build', ['clean', 'img', 'sass', 'js', 'images'], function() {

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildLibs = gulp.src('app/js/libs/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildCss = gulp.src('app/css/*.css')
        .pipe(gulp.dest('dist/css'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});
