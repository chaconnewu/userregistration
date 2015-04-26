module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        // successRedirect : '/profile', // redirect to the secure profile section
        // failureRedirect : '/login', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    }), function(req, res) {
        console.log('in server login');
    });

    // app.post('/login', function(req, res) {
    //     console.log('in server login');
    // });

    // app.post('/login', do all our passport stuff here);

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }), function(req, res) {
        console.log('in server signup');
    });

    // app.post('/signup', do all our passport stuff here);

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}


