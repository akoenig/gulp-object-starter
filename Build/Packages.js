var Packages = require('./Repositories/Packages.js');
var config = require('./Config.js');
var packagesRepository = new Packages();
var paths = config.paths;

// Tasks
packagesRepository.addTask({
    'compile:sass': require('./Tasks/Compilers/Sass.js'),
    'compile:scripts': require('./Tasks/Compilers/Scripts.js')
});

// Example Package Configuration
packagesRepository.addPackage({
    'name': 'examplePackage',
    'basePath': paths.packages + 'examplePackage/',

    'sass': {
        'src': paths.private + 'Sass/',
        'dest': paths.public + 'Styles/',
        'filePattern': '*.scss',
        'settings': {
            'imagePath': 'Images' // Used by the image-url helper
        }
    },
    'images': {
        'src': paths.private + 'Images/',
        'dest': paths.public + 'Images/',
        'filePattern': '*.{png,jpg,gif,svg}',
        'settings': {
            'progressive': true,
            'svgoPlugins': [{ 
                'removeViewBox': false 
            }]
        }
    },
    'scripts': {
        'src': paths.private + 'Scripts/',
        'dest': paths.public + 'Scripts/',
        'filePattern': '*.js',
        'bundles': [
            {
                'name': 'main',
                'src': 'App.js',
                'dest': 'App.min.js',
                'options': {
                    'external': ['lodash']
                }
            }, 
            {
                'name': 'vendor',
                'src': null,
                'dest': 'Vendor.min.js',
                'options': {
                    'external': null,
                    'require': ['lodash']
                }
            }
        ]
    }
});

module.exports = packagesRepository;
