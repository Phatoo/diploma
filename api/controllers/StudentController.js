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

var _from = "ProductController: ";

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProductController)
   */
  _config: {}
    //Temporary to help show Alisa products that have issues:

  ,getStudentsList: function(req, res) {
    Student.find({}).done(function(err, students) {
      if(err) {
          res.send(err, 500);
      } else {

        return res.view('profile/studentsList', {
          students: students
        });
      }
    });
  }

  ,getStudentsProfileView: function(req, res) {
    sails.log.debug('getStudentsProfileView');

    Student.findOne({ id: req.params.id }).done(function(err, student) {
      if(err) {
        sails.log.error('db error');
        sails.log.verbose('err:', err);
        res.send(err, 500);
        return;
      };

      if(!student) {
        sails.log.error('student not found');
        sails.log.verbose('id:', req.params.id);
        res.send(err, 500);
        return;
      };

      sails.log.debug('success');
      sails.log.verbose('student:', student);
      return res.view('profile/student', {
        student: student
      });
        

    });
  }

  // ,like: function(req, res) {

  // }



};
