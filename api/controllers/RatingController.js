
var async = require('async');

module.exports = {

  showIndex: function(req, res) {
    sails.log.debug('showIndex');

    var series = [];
    var groups = [];
    sails.config.constants.groups.forEach(function(group) {

      series.push(function(callback) {
        Discipline.find({group: group}).done(function(err, disciplines) {
          if(err) {
            sails.log.debug('error');
            sails.log.verbose('err:', err);
            res.send(err, 500);
            return;
          }

          groups.push({
            name: group
            ,disciplines: disciplines
          });

          callback();
        });
      });

      sails.log.debug('group:', group);

    });

    async.series(series, function(err, success) {
      res.view('rating/index', {
        groups: groups
      });
    });
  }

  ,showRating: function(req,res) {
    sails.log.verbose('discipline:', req.params.discipline);
    sails.log.verbose('group:', req.params.group);

    Student.find({group: req.params.group}).done(function(err, students) {

      if(err) {
        sails.log.debug('student find error');
        sails.log.verbose('err:', err);
        res.send(err, 500);
        return;
      };

      Teacher.findOne({discipline:req.params.discipline}).done(function(err, teacher) {
        if(err) {
          sails.log.debug('teacher find error');
          sails.log.verbose('err:', err);
          res.send(err, 500);
          return;
        }

        sails.log.debug('success');
        sails.log.verbose('students: ', students);
        sails.log.verbose('teacher:', teacher);

        res.render('rating/detailed', {
          students: students
          ,discipline: {
            name: req.params.discipline
          }
          ,teacher: teacher
          ,rating: {
            discipline_id: req.params.discipline_id
          }
        });

      });



      
    });


  }
}
