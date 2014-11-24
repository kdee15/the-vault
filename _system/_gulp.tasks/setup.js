// REGISTER COMPONENTS ================================================================================================

var config = require('../../_config.json'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat')
    ;

// END ================================================================================================================

// GULP TASKS [INSTALLS] ==============================================================================================

// A. INSTALL KONSTRUCT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('install-css', function() {

    // A.1. INSTALL VENDOR LIBRARIES -------------------------------------

    for( vendor in config.core.konstructVendor) {
    gulp.src(['_bower.cache/' + config.core.konstructVendor[vendor] ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/css/konstruct/vendor').on('error', gutil.log));

    }

    // A.1. END -------------------------------------

    // A.2. INSTALL KONSTRUCT CORE -------------------------------------

    for( base in config.core.konstructBase) {
    gulp.src(['_bower.cache/' + config.core.konstructBase[base] + '/*/*' ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/css/konstruct').on('error', gutil.log));

    }

    // A.2. END -------------------------------------

    // A.3. INSTALL KONSTRUCT CONFIGURATION -------------------------------------

    for( configurer in config.core.konstructConfig) {
    gulp.src(['_bower.cache/' + config.core.konstructConfig[configurer] + '/*/*' ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/css').on('error', gutil.log));

    }

    // A.3. END -------------------------------------

    // A.4. INSTALL KONSTRUCT SITE -------------------------------------

    for( site in config.core.konstructSite) {
    gulp.src(['_bower.cache/' + config.core.konstructSite[site] + '/*/**/*' ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/css/').on('error', gutil.log));

    }

    // A.4. END -------------------------------------

    // A.5. INSTALL KONSTRUCT GLUE -------------------------------------

    gulp.src(['_bower.cache/konstruct.glue/single.core.scss' ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/css/').on('error', gutil.log));

    // A.5. END -------------------------------------

});

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// B. INSTALL JAVASCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('install-js', function() {

    for( library in config.core.components) {
        gulp.src(['_bower.cache/' + config.core.components[library], ])
        .pipe(gulp.dest('../' + config.siteSource + '/assets/js/components/').on('error', gutil.log));
    }

});

// B. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// C. PREPARE JAVASCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('prepare-js', function() {
    
  gulp.src([
            '../' + config.siteSource + '/assets/js/components/*.*.js'
           ])
    .pipe(concat('components.js'))
    .pipe(gulp.dest('../' + config.siteSource + '/assets/js/'))
    gulp.src([
            '../' + config.siteSource + '/assets/js/components/*.*.map'
           ])
    .pipe(gulp.dest('../' + config.siteSource + '/assets/js/'))

});

// C. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// END ================================================================================================================

// GULP TASK [JAVASCRIPT] =============================================================================================





// END ================================================================================================================

// GULP TASK [UPDATE] =================================================================================================

// A. UPDATE KONSTRUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('update-css', function() {

    // B.2.1. Install Konstruct Vendors
    for( vendor in config.core.konstructVendor) {
        gulp.src(['assets/_asset-cache/' + config.core.konstructVendor[vendor] ])
        .pipe(gulp.dest('assets/css/konstruct/vendor').on('error', gutil.log));

        console.log();
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log();
        console.log('Updated your vendor libraries!');
        console.log();
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log();

    }

    // B.2.2. Install Konstruct base
    for( base in config.core.konstructBase) {
        gulp.src(['assets/_asset-cache/' + config.core.konstructBase[base] + '/*/**/*' ])
        .pipe(gulp.dest('assets/css/konstruct').on('error', gutil.log));

        console.log();
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log();
        console.log('Updated the Konstruct core!');
        console.log();
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log();

    }

    // B.2.3. Install Konstruct Glue
    gulp.src(['assets/_asset-cache/konstruct.glue/single.core.scss' ])
    .pipe(gulp.dest('assets/css/').on('error', gutil.log));

    console.log();
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log();
    console.log('Updated the glue!');
    console.log();
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log();


});

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// END ================================================================================================================

// GULP TASK [UTILITY] ================================================================================================

// A. PURGE SYSTEM ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('system-purge', function() {
      gulp.src([
                'assets/js/components',
                'assets/css',
                'node_modules',
                '.sass-cache',
                '_asset-cache',
                'assets/js/app.js',
                'assets/js/components.js',
                'assets/js/*.map'
               ])
        .pipe(clean())

    console.log();
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log();
    console.log('SYSTEM HAS BEEN PURGED SIR!');
    console.log();
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log();

});

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// END ================================================================================================================