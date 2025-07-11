const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat');

// Пути
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/',
    libs: [
      'node_modules/@coreui/coreui-pro/dist/css/coreui.min.css',
      'node_modules/swiper/swiper-bundle.min.css'
    ]
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
    libs: [
      'node_modules/@coreui/coreui-pro/dist/js/coreui.bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
    ]
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts/'
  },
  pages: {
    src: 'src/pages/**/*.html',
    dest: 'dist/'
  },
  components: {
    src: 'src/components/**/*.html',
    dest: 'dist/components/'
  }
};

// Очистка dist
function clean() {
  return del(['dist']);
}

// Конкатенация + SCSS -> CSS
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src([
    'node_modules/@coreui/coreui-pro/dist/js/coreui.bundle.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
    paths.scripts.src
  ])
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// HTML
function html() {
  return src(paths.pages.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(paths.pages.dest))
    .pipe(browserSync.stream());
}

// Шрифты
function fonts() {
  return src(paths.fonts.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Картинки
function images() {
  return src(paths.images.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Сервер + вотчер
function serve() {
  browserSync.init({
    server: { baseDir: './dist' },
    notify: false,
    open: false
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
  watch([paths.pages.src, paths.components.src], html);
}

// Экспорт задач
exports.build = series(clean, parallel(styles, scripts, images, fonts, html));

exports.default = series(clean, parallel(styles, scripts, images, fonts, html), serve);