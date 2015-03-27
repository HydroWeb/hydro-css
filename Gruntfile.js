module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			test: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
					loadPath: [
						'./node_modules/bootcamp/dist',
						'./scss'
					]
				},
				files: {
					'./spec/results.css' : './spec/tests.scss'
				}
			}
		},

		bootcamp: {
			test: {
				files: {
					src: ['./spec/results.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('bootcamp');

	grunt.registerTask('test', ['sass', 'bootcamp']);
};
