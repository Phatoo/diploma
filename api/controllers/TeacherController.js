/**
 * ProductController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _from = "TeacherController: ";

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProductController)
   */
  _config: {}
    //Temporary to help show Alisa products that have issues:

  ,getTeachersList: function(req, res) {
    Teacher.find({}).done(function(err, teachers) {
      if(err) {
          res.send(err, 500);
      } else {

        return res.view('profile/teachersList', {
          teachers: teachers
        });
      }
    });
  }

  ,getTeachersProfileView: function(req, res) {

    Teacher.findOne({ id: req.params.id }).done(function(err, teacher) {

      if(err) {
        sails.log.error('db error');
        sails.log.verbose('err:', err);
        res.send(err, 500);
        return;
      };

      if(!teacher) {
        sails.log.error('teacher not found');
        sails.log.verbose('id:', req.params.id);
        res.send(err, 500);
        return;
      };

      sails.log.debug('success');
      sails.log.verbose('teacher:', teacher);
      return res.view('profile/teacher', {
        teacher: teacher
      });

    });
  }
};
