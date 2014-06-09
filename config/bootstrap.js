/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var app = sails.express.app;
  app.set('view options', { pretty:true });
  app.locals.pretty = true;


  //setup disciplines

  //clear disciplines
  Discipline.destroy().done(function(err) {
    if(err) {
      sails.log.error('clear disciplines error: ', err);
      return;
    }


    //add disciplines
    Discipline.create([
    //a-60
    {
      name:'ТИ и К'
      ,group:'a-60'
    },{
      name:'МИОР'
      ,group:'a-60'
    },{
      name:'ПРвИС'
      ,group:'a-60'
    },{
      name:'ИПСАПР'
      ,group:'a-60'
    },
    //a-70
    {
      name:'ИПСАПР'
      ,group:'a-70'
    },{
      name:'АКТП'
      ,group:'a-70'
    },{
      name:'Политология'
      ,group:'a-70'
    },{
      name:'Орг. и план Пр-ва'
      ,group:'a-70'
    },{
    //a-61
      name:'Иностранный язык'
      ,group:'a-61'
    },{
    //a-62
      name:'Иностранный язык'
      ,group:'a-62'
    },{
    //a-71
      name:'Иностранный язык'
      ,group:'a-71'
    },{
    //a-72
      name:'Иностранный язык'
      ,group:'a-72'
    }
    ]).done(function(err) {
      if(err) {
        sails.log.error('db error:');
        sails.log.verbose('err:', err);
        return;
      }
    
      cb();
    })

    // sails.log.debug('filling of db, success');
    
  });

};
