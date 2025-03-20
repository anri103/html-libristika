const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');
const fileInclude = require('gulp-file-include'); // Для импорта HTML-компонентов

// Пути к исходным файлам и папке назначения
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
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
    dest: 'dist/pages/'
  },
  components: {
    src: 'src/components/**/*.html',
    dest: 'dist/components/'
  }
};

// Очистка папки dist
function clean() {
  return del(['dist']);
}

// Компиляция SCSS в CSS
function styles() {
  return src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css', // Bootstrap CSS
    'node_modules/swiper/swiper-bundle.min.css', // Swiper CSS
    paths.styles.src // Ваши CSS-файлы
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Копирование и обработка HTML-файлов с импортом компонентов
function html() {
  return src(paths.pages.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(paths.pages.dest))
    .pipe(browserSync.stream());
}

// Копирование шрифтов
function fonts() {
  return src(paths.fonts.src, { encoding: false })
    .pipe(dest(paths.fonts.dest))
    .pipe(browserSync.stream());
}

// Копирование изображений
function images() {
  return src(paths.images.src, { encoding: false })
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Копирование JS-файлов (включая Bootstrap и Swiper)
function scripts() {
  return src([
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // Bootstrap JS
    'node_modules/swiper/swiper-bundle.min.js', // Swiper JS
    paths.scripts.src // Ваши JS-файлы
  ])
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Запуск сервера и отслеживание изменений
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'pages/index.html'
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
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.serve = serve;

// Сборка проекта
exports.build = series(clean, parallel(styles, scripts, images, fonts, html));

// Задача по умолчанию
exports.default = series(clean, parallel(styles, scripts, images, fonts, html), serve);