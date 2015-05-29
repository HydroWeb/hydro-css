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

		sass: {

			test: {
				options: {
					outputStyle: 'expanded', // "style: 'expanded'" in Ruby Sass
					sourceMap: false, // "sourcemap: 'none'" in Ruby Sass
					includePaths: [ // "loadPath: [...]" in Ruby Sass
						'./node_modules/bootcamp/dist',
						'./scss'
					]
				},
				files: {
					'./spec/results.css' : './spec/tests.scss'
				}
			},

			demo: {
				options: {
					outputStyle: 'expanded', // "style: 'expanded'" in Ruby Sass
					sourceMap: false, // "sourcemap: 'none'" in Ruby Sass
					includePaths: ['./scss'] // "loadPath: [...]" in Ruby Sass
				},
				files: {
					'./demo/styles/app.css' : './demo/styles/src/app.scss'
				}
			}
		},

		bootcamp: {

			test: {
				files: {
					src: ['./spec/results.css']
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
	grunt.loadNpmTasks('grunt-sass'); // "grunt-contrib-sass" for Ruby Sass
	grunt.loadNpmTasks('bootcamp');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('test', ['sass:test', 'bootcamp:test']);
	grunt.registerTask('lint', ['scsslint:lint']);
	grunt.registerTask('demo', ['sass:demo', 'autoprefixer:demo']);
};
