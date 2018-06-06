var gulp = require('gulp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
	var bundle = browserify('./src/index.js', {debug: true});

	if (watch) {
		bundle = watchify(bundle);
		bundle.on('update', function () {
			console.log('--> Bundling...');
			rebundle();
		});
	}

	function rebundle() {
		bundle
			.transform(babel, { presets: [ 'es2015' ], plugins: ['syntax-async-functions', 'transform-regenerator'] })
			.bundle()
			.on('error', function (err) { console.log(err); this.emit('end') })
			.pipe(source('index.js'))
			.pipe(rename('app.js'))
			.pipe(gulp.dest('public'));
	}

	rebundle();
}

gulp.task('build', function () {
	return compile();
});

// gulp.watch('./styles/index.scss', ['styles']);

gulp.task('watch', function () { return compile(true); });
