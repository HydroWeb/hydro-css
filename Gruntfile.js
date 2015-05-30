module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		scsslint: {

			lint: {
				allFiles: ['./scss/*.scss'],
				options: {
					config: '.scss-lint.yml',
					reporterOutput: 'scss-lint-reporter.xml'
				}
			}
		},

		libsass: {

			test: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false,
					includePaths: [
						'./node_modules/sass-true/sass',
						'./scss'
					]
				},
				files: {
					'./spec/results-libsass.css' : './spec/tests.scss'
				}
			},

			demo: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false,
					includePaths: ['./scss']
				},
				files: {
					'./demo/styles/app.css' : './demo/styles/src/app.scss'
				}
			}
		},

		rubysass: {

			test: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
					loadPath: [
						'./node_modules/sass-true/sass',
						'./scss'
					]
				},
				files: {
					'./spec/results-rubysass.css' : './spec/tests.scss'
				}
			}
		},

		autoprefixer: {

			demo: {
				options: {
					browsers: ['last 4 versions']
				},
				src: './demo/styles/app.css',
				dest: './demo/styles/app.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.renameTask('sass', 'libsass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.renameTask('sass', 'rubysass');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('test', ['libsass:test', 'rubysass:test']);
	grunt.registerTask('lint', ['scsslint:lint']);
	grunt.registerTask('demo', ['libsass:demo', 'autoprefixer:demo']);
};
