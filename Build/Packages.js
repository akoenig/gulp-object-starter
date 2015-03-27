var Packages = require('./Repositories/Packages.js');
var config = require('./Config.js');
var packagesRepository = new Packages();
var paths = config.paths;

// Tasks
packagesRepository.addTask({
    'compile:sass': require('./Tasks/Compilers/Sass.js')
});

// Example Package Configuration
packagesRepository.addPackage({
    'name': 'examplePackage',
    'basePath': paths.packages + 'examplePackage/',
    'sass': {
        src: paths.private + 'Sass/**/*.scss',
        dest: paths.public + 'Styles',
        settings: {
            imagePath: 'Images' // Used by the image-url helper
        }
    },
    'images': {
        src: paths.private + 'Images/*.{png,jpg,gif,svg}',
        dest: paths.public + 'Images',
        settings: {
            progressive: true,
            svgoPlugins: [{ 
                removeViewBox: false 
            }]
        }
    },
    'scripts': {
        src: paths.private + 'Scripts/**/*.js',
        dest: paths.public + 'Scripts',
        bundles: [
            {
                entries: './' + paths.packages + 'examplePackage/' + paths.private + 'Scripts/App.js',
                dest: './' + paths.packages + 'examplePackage/' + paths.public + 'Scripts',
                outputName: 'App.min.js'
            }
        ]
    }
});

module.exports = packagesRepository;
