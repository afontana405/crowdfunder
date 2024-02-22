const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'You must be logged in to access this feature' });
  } else {
    next();
  }
};

const withoutAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withAuth, apiAuth, withoutAuth };