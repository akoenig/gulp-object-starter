var basePaths = {
    exts: 'typo3conf/ext/',
    private: 'Resources/Private/',
    public: 'Resources/Public/',
    docs: 'Documentation/'
};

var config = {
    project: {
        isInDevMode: true,
        browserSupport: ['last 2 version', 'ie 9']
    },
    packages: []
};

// Example Package Configuration
config.packages.push({
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
            entries: './typo3conf/ext/myPackage/Resources/Private/Scripts/App.js',
            dest: './typo3conf/ext/myPackage/Resources/Public/Scripts',
            outputName: 'App.min.js'
        }]
    }
});

module.exports = config;