var Package = require('./Models/Package.js');
var config = require('./Config.js');
var basePaths = config.paths;
var PackagesRepository = [];

// Example Package Configuration
PackagesRepository.push(new Package({
    'basePath': basePaths.exts + 'myPackage/',
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
            svgoPlugins: [{removeViewBox: false}]
        }
    },
    'scripts': {
        src: basePaths.private + 'Scripts/**/*.js',
        dest: basePaths.public + 'Scripts',
        bundles: [
            {
                entries: './' + basePaths.exts + 'myPackage/' + basePaths.private + 'Scripts/App.js',
                dest: './' + basePaths.exts + 'myPackage/' + basePaths.public + 'Scripts',
                outputName: 'App.min.js'
            }
        ]
    }
}));

module.exports = PackagesRepository;