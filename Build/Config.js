var basePaths = {
    exts: 'typo3conf/ext/',
    private: 'Resources/Private/',
    public: 'Resources/Public/',
    docs: 'Documentation/'
};

var Config = function () {
    'use strict';

    this.project = {
        isInDevMode: true,
        browserSupport: ['last 2 version', 'ie 9']
    };
    this.extensions = [];

    // Example Extension Configuration
    this.extensions.push({
        'basePath': basePaths.exts + 'myExtension/',
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
            watchPattern: '**/*.js',
            bundles: [{
                entries: './typo3conf/ext/myExtension/Resources/Private/Scripts/App.js',
                dest: './typo3conf/ext/myExtension/Resources/Public/Scripts',
                outputName: 'App.min.js'
            }]
        }
    });

    return this;
};

var singleton;
module.exports = (function () {
    'use strict';

    singleton = singleton || new Config();

    return singleton;
}());