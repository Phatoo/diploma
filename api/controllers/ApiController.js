

module.exports = {

  admin_login: function(req, res){

    console.log('in admin_login');

    var loginSuccess = function success(content) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(content);
    };

    var loginError = function error(status, content) {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(content);
    };

    if (req.method === 'PUT') {
      if (req.body.SESSION.USER_NAME === 'letme' && req.body.SESSION.PASS === 'in') {
        loginSuccess('{ "SESSION": { "TOKEN": "secret token!", "AUTHENTICATED_USER": { "ID": 1 } } }');
      } else {
        loginError(422, '{ "ERROR": { "MSG": "invalid credentials" } }');
      }
    // callback that will be invoked when the user logs out
    } else if (req.method === 'DELETE') {
      loginSuccess('');
    } else {
      next();
    }
  }
}
