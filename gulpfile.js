const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');
const fileInclude = require('gulp-file-include');

// Пути
const paths = {
  pages: {
    src: 'src/pages/**/*.html',
    dest: 'dist/'
  },
  components: {
    src: 'src/components/**/*.html'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  vendorCSS: {
    src: [
      'node_modules/@coreui/coreui-pro/dist/css/coreui.min.css',
      'node_modules/swiper/swiper-bundle.min.css'
    ],
    dest: 'dist/css/'
  },
  vendorJS: {
    src: [
      'node_modules/@coreui/coreui-pro/dist/js/coreui.bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js'
    ],
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts/'
  }
};

// Очистка dist
function clean() {
  return del(['dist']);
}

// HTML (include компонентов)
function html() {
  return src(paths.pages.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(paths.pages.dest))
    .pipe(browserSync.stream());
}

// SCSS
function styles() {
  return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Копирование vendor CSS
function vendorCSS() {
  return src(paths.vendorCSS.src)
    .pipe(dest(paths.vendorCSS.dest))
    .pipe(browserSync.stream());
}

// Копирование vendor JS
function vendorJS() {
  return src(paths.vendorJS.src)
    .pipe(dest(paths.vendorJS.dest))
    .pipe(browserSync.stream());
}

// Копирование изображений
function images() {
  return src(paths.images.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Копирование шрифтов
function fonts() {
  return src(paths.fonts.src, { encoding: false, allowEmpty: true })
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Запуск сервера и слежка
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
  watch([paths.pages.src, paths.components.src], html);
}

// Основные задачи
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.vendorCSS = vendorCSS;
exports.vendorJS = vendorJS;
exports.images = images;
exports.fonts = fonts;

exports.default = series(
  clean,
  parallel(html, styles, scripts, vendorCSS, vendorJS, images, fonts),
  watchFiles
);

exports.build = series(
  clean,
  parallel(html, styles, scripts, vendorCSS, vendorJS, images, fonts)
);