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


var fs = require('fs');
var path = require('path');
var _from = "AdminController: ";

var Receiver = require('../services/diskReceiver');

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   */
  _config: {}

  /*
   * Student
   */

  ,showStudentPanel: function(req, res) {

    Student.find({}).done(function(err,students) {
      res.view('admin/student', {
        students: students
      });
    });
  }
  ,createStudent: function(req, res) {
    if(req.body) {

      sails.log.info('body', req.body);

      Student.create(req.body).done(function(err, student) {
        if(!err){
          if(student){
            res.redirect('admin/student')
          }else{
            res.redirect('admin/student')
          }
        }else{
          res.redirect('admin/student')
        }
      })
    }else{
      res.redirect('admin/student')
    }
  }
  ,deleteStudent: function(req, res) {

    sails.log.debug('deleteStudent');

    if(req.params.id) {

      // sails.log.info('body', req.body);

      Student.destroy({ id: req.params.id }).done(function(err, student) {
        if(!err){
          sails.log.debug('success');
          res.redirect('admin/student');
        }else{
          sails.log.debug('db error');
          sails.log.verbose(err);
          res.redirect('admin/student');
        }
      })
    }else{
      sails.log.debug('req.params.id not defined');
      res.redirect('admin/student')
    }
  }
  ,showIndex: function(req, res) {

    res.view('admin/index');
  }


  /*
   * Teacher
   */

  ,showTeacherPanel: function(req, res) {
    sails.log.debug('showTeacherPanel');

    Teacher.find({}).done(function(err,teachers) {
      if(err) {
        
        sails.log.debug('db error');
        sails.log.verbose(err);
        
        res.view('admin/teacher', {
          teachers: []
        });
      } else {
        
        sails.log.debug('success');
        sails.log.verbose('teachers:', teachers);
        
        res.view('admin/teacher', {
          teachers: teachers
        });  
      }
    });
  }
  ,createTeacher: function(req, res) {
    sails.log.debug('createTeacher');

    if(req.body) {

      sails.log.info('body', req.body);

      Teacher.create(req.body).done(function(err, teacher) {
        if(!err){

          sails.log.debug('success');
          sails.log.verbose('teacher:', teacher);
          
          res.redirect('admin/teacher')
        }else{
          
          sails.log.debug('db error');
          sails.log.verbose(err);
          
          res.redirect('admin/teacher')
        }
      })
    }else{
      
      sails.log.debug('error, body is not defined');
      
      res.redirect('admin/teacher')
    }
  }

  ,deleteTeacher: function(req, res) {

    sails.log.debug('deleteTeacher');

    if(req.params.id) {

      Teacher.destroy({ id: req.params.id }).done(function(err, teacher) {
        if(!err){
          
          sails.log.debug('success');
          
          res.redirect('admin/teacher');
        }else{
          
          sails.log.debug('db error');
          sails.log.verbose(err);
          
          res.redirect('admin/teacher');
        }
      })
    }else{
      
      sails.log.debug('req.params.id not defined');
      
      res.redirect('admin/teacher')
    }
  }

  /*
   * News
   */

  ,showNewsPanel: function(req, res) {

    News.find({}).done(function(err,news) {
      res.view('admin/news', {
        news: news
      });
    });
  }

  ,createNews: function(req, res) {
    if(req.body) {

      sails.log.info('body', req.body);

      News.create(req.body).done(function(err, news) {

        if(!err){
          if(news){
            res.redirect('admin/news')
          }else{
            res.redirect('admin/news')
          }
        }else{
          res.redirect('admin/news')
        }
      })
    }else{
      res.redirect('admin/news')
    }
  }

  ,deleteNews: function(req, res) {

    sails.log.debug('deleteNews');

    if(req.params.id) {

      // sails.log.info('body', req.body);

      News.destroy({ id: req.params.id }).done(function(err, student) {
        if(!err){
          sails.log.debug('success');
          res.redirect('admin/news')
        }else{
          sails.log.debug('db error');
          sails.log.verbose(err);
          res.redirect('admin/news')
        }
      })
    }else{
      sails.log.debug('req.params.id not defined');
      res.redirect('admin/news')
    }
  }


  /*
   * Qr
   */

  ,showQrPanel: function(req, res) {

    Qr.find({}).done(function(err,qrs) {




      res.view('admin/qr', {
        qrs: qrs
      });
    });

    // res.view('admin/qr');
  }

  ,createQr: function(req, res) {
    if(req.body) {

      var qrData = {
        name: req.body.name,
        description: req.body.description,
        local_url: ''
      };

      //create qr instance
      Qr.create(qrData).done(function(err, qr) {
        if(!err){
          if(qr){

            //save image
            req.file('image').upload( Receiver({
              fileName: qr.id + '.png'
            }), function onUploadComplete (err, uploadedFiles) {
              
              //update qr instnace with local_url
              Qr.update({
                id: qr.id
              },{
                local_url: '/qr_images/' + qr.id + '.png'
              }, function(err, qr) {

                if(err) {
                  sails.log.error(_from + 'qr update error:', err);
                  res.redirect('admin/qr');
                  return;
                }

                fs.readFile('/qr_images/' + qr.id + '.png', 'binary', function (err,file) {
                  if (err) {
                    return res.redirect('admin/qr');
                  }

                  var tempFileName = file.path.substring(file.path.lastIndexOf('/')+1)
                  var fileName = file.name.substring(0, file.name.lastIndexOf('.'))
                  console.log('tempFileName: ', tempFileName);
                  console.log('fileName: ', fileName);
                  var headers = {
                    'Content-Type' : 'image/jpg',
                    'x-amz-acl'    : 'public-read'
                  };
                  console.log('does it exists?', fs.existsSync(file.path) );
                  var uploader = client.upload(file.path, "/images/"+fileName+'_'+tempFileName, headers);

                  uploader.on('error', function(err) {
                    logger.error("unable to upload:"+ err.stack, logCat);
                    console.log(err);
                    res.send({
                      success: false
                      ,message: 'S3 image upload error'
                      ,error: err.stack
                    })
                  });

                  uploader.on('progress', function(amountDone, amountTotal) {
                    logger.info("progress", amountDone, amountTotal, logCat);
                  });

                  uploader.on('end', function(url) {
                    logger.info("file available at", url, logCat);
                    var body = req.body
                    body.url = url
                    try{
                      fs.unlinkSync(file.path)
                      logger.info("temp image deleted: "+file.name, logCat)
                    } catch(e) {
                      logger.error("cant remove temp image file: "+file.name+"\n"+e, logCat)
                    }
                  
                    sails.log.debug(_from + 'qr saved:', qr);
                    res.redirect('admin/qr');

                  });

                });
              });
            });
          }else{
            sails.log.debug('error');
            res.redirect('admin/qr')
          }
        }else{
          sails.log.debug('error');
          res.redirect('admin/qr')
        }
      })
    }else{
      sails.log.debug('error');
      res.redirect('admin/qr')
    }
  }

  ,deleteQr: function(req, res) {

    sails.log.debug('deleteQr, id:', req.params.id);

    if(req.params.id) {

      // sails.log.info('body', req.body);
      Qr.destroy({ id: req.params.id }).done(function(err, qr) {
        if(!err){

          if (fs.existsSync('./assets/qr_images/' + req.params.id + '.png')) {
            fs.unlink('./assets/qr_images/' + req.params.id + '.png', function (err) {
              if (err) {
                sails.log.debug('fs error');
                sails.log.verbose(err);
                res.redirect('admin/qr');
                return;
              }

              sails.log.debug('success');
              res.redirect('admin/qr');
            });
          } else {
            sails.log.debug('success');
            res.redirect('admin/qr');
          }

        }else{
          sails.log.debug('db error');
          sails.log.verbose(err);
          res.redirect('admin/qr');
        }
      })
    }else{
      sails.log.debug('req.params.id not defined');
      res.redirect('admin/qr');
    }
  }
};
