var Package = require('./Models/Package.js');
var basePaths = {
    exts: 'Web/typo3conf/ext/',
    private: 'Resources/Private/',
    public: 'Resources/Public/',
    docs: 'Documentation/'
};

var config = {
    project: {
        isInDevMode: true,
        browserSupport: ['last 2 version', 'ie 9']
    },
    packages: [],

    // Configuration rules for http://jscs.info/
    jscs: {
        'esnext': true,
        'preset': 'google',
        'validateIndentation': null
    },

    // Configuration for https://github.com/doctyper/gulp-modernizr
    modernizr: {
        'fileName': 'Modernizr.min.js',
        'destPath': 'Web/Modernizr/',
        'config': {
            // Based on default settings on http://modernizr.com/download/
            'options': [
                'setClasses',
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind'
            ]
        }
    }
};

// Example Package Configuration
config.packages.push(new Package({
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
        src: basePaths.private + 'Scripts/',
        dest: basePaths.public + 'Scripts',
        filePattern: '**/*.js',
        bundles: [{
            entries: './Web/typo3conf/ext/myPackage/Resources/Private/Scripts/App.js',
            dest: './Web/typo3conf/ext/myPackage/Resources/Public/Scripts',
            outputName: 'App.min.js'
        }]
    }
}));

module.exports = config;