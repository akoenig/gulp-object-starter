var Packages = require('./Repositories/Packages.js');
var config = require('./Config.js');
var packagesRepository = new Packages();
var basePaths = config.paths;

// Example Package Configuration
packagesRepository.addPackage({
    'basePath': basePaths.packages + 'myPackage/',
    'sass': {
        src: basePaths.private + 'Sass/**/*.scss',
        dest: basePaths.public + 'Styles',
        settings: {
            imagePath: 'Images' // Used by the image-url helper
        }
    },
    'images': {
        src: basePaths.private + 'Images/*.{png,jpg,gif,svg}',
        dest: basePaths.public + 'Images',
        settings: {
            progressive: true,
            svgoPlugins: [{ 
                removeViewBox: false 
            }]
        }
    },
    'scripts': {
        src: basePaths.private + 'Scripts/**/*.js',
        dest: basePaths.public + 'Scripts',
        bundles: [
            {
                entries: './' + basePaths.packages + 'myPackage/' + basePaths.private + 'Scripts/App.js',
                dest: './' + basePaths.packages + 'myPackage/' + basePaths.public + 'Scripts',
                outputName: 'App.min.js'
            }
        ]
    }
});

module.exports = packagesRepository;