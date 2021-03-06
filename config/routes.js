/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  //
  // (This would also work if you had a file at: `/views/home.ejs`)



  '/': {
    controller: 'NewsController'
    ,action: 'showNewsPage'
  }

  //qr images
  ,'get /qr_images/:name': {
    controller     : 'ImageController'
    ,action          : 'getQrImage'
  }  

  //admin

  ,'get /admin/index': {
    controller     : 'AdminController'
    ,action          : 'showIndex'
  }


  //news
  ,'get /admin/news': {
    controller: 'AdminController'
    ,action: 'showNewsPanel'
  }
  ,'post /admin/create/news': {
    controller     : 'AdminController'
    ,action        : 'createNews'
  }
  ,'get /admin/delete/news/:id': {
    controller     : 'AdminController'
    ,action        : 'deleteNews'
  }


  //qr
  ,'get /admin/qr': {
    controller: 'AdminController'
    ,action: 'showQrPanel'
  }
  ,'post /admin/create/qr': {
    controller     : 'AdminController'
    ,action        : 'createQr'
  }
  ,'get /admin/delete/qr/:id': {
    controller     : 'AdminController'
    ,action        : 'deleteQr'
  }

  //for debugging
  ,'get /admin/getQrImagesNames/': {
    controller     : 'ImageController'
    ,action        : 'getQrImagesNames'
  }  

  //student
  ,'get /admin/student': {
    controller     : 'AdminController'
    ,action          : 'showStudentPanel'
  }
  ,'post /admin/create/student': {
    controller     : 'AdminController'
    ,action        : 'createStudent'
  }
  ,'get /admin/delete/student/:id': {
    controller     : 'AdminController'
    ,action        : 'deleteStudent'
  }


  //teacher
  ,'get /admin/teacher': {
    controller     : 'AdminController'
    ,action        : 'showTeacherPanel'
  }
  ,'post /admin/create/teacher': {
    controller     : 'AdminController'
    ,action        : 'createTeacher'
  }
  ,'get /admin/delete/teacher/:id': {
    controller     : 'AdminController'
    ,action        : 'deleteTeacher'
  }



  //schedule kst
  ,'get /schedule': {
      controller   : 'ScheduleController'
      ,view        : 'schedule/index'
  }

  //get schedule of group 
  ,'get /schedule/:group_id': {
      controller   : 'ScheduleController'
      ,action        : 'showSchedule'
  }


  //rating list
  ,'get /rating': {
      controller   : 'RatingController'
      ,action        : 'showIndex'
  }
  //get schedule of group
  ,'get /rating/group/:group/discipline/:discipline': {
      controller   : 'RatingController'
      ,action        : 'showRating'
  }


  //journal
  ,'post /journal': {
      controller    : 'JournalController'
      ,action        : 'create'
  }
  ,'post /journal/:group': {
      controller    : 'JournalController'
      ,action        : 'create'
  }
  ,'get /journal': {
      controller    : 'JournalController'
      // ,action        : 'list'
      ,action         : 'showIndex'
    }
  ,'get /journal/group/:group/discipline/:discipline': {
      controller    : 'JournalController'
      ,action        : 'showJournal'
  }
  ,'delete /journal' :{
    controller  : 'JournalController'
    ,action     : 'statusList'
  }

  //student
  ,'post /student': {
      controller    : 'StudentController'
      ,action        : 'create'
  }
  ,'post /student/:id': {
      controller    : 'OrderController'
      ,action        : 'update'
  }
  ,'get /student': {
      controller    : 'StudentController'
      ,action        : 'getStudentsList'
    }
  ,'get /student/:id': {
      controller    : 'StudentController'
      ,action        : 'getStudentsProfileView'
  }
  ,'delete /student' :{
    controller  : 'OrderController'
    ,action     : 'statusList'
  }

  //teacher
  ,'post /teacher': {
      controller    : 'OrderController'
      ,action        : 'create'
  }
  ,'post /teacher/:id': {
      controller    : 'TeacherController'
      ,action        : 'getTeachersProfileView'
  }
  ,'get /teacher': {
      controller    : 'TeacherController'
      ,action        : 'getTeachersList'
    }
  ,'get /teacher/:id': {
      controller    : 'TeacherController'
      ,action        : 'getTeachersProfileView'
  }
  ,'delete /teacher' :{
    controller  : 'OrderController'
    ,action     : 'statusList'
  }


};
