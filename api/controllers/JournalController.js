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

var _from = "JournalController: ";

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProductController)
   */
  _config: {}
    //Temporary to help show Alisa products that have issues:


  ,showJournal: function(req,res) {

    sails.log.debug('showJournal');

    req.params.group;
    req.params.discipline_name;

    sails.log.verbose('req.params.group: ', req.params.group);

    Student.find({ group: req.params.group }).done(function(err, students) {

      if(err) {
        sails.log.debug('error');
      } else {
        sails.log.debug('success');
        sails.log.verbose('students: ', students);
        res.render('journal/detailed', {
          journal: {
            group_id: req.params.group_id
          },
          students: students
        });  
      }

      
    })

    


  }


  ,findall2: function(req, res) {
    console.log('findAll2');
    console.log(req.query.style_id);
    if(!req.query.page) req.query.page = 1;
    if(!req.query.limit) req.query.limit = 12;
    Product.find({"style_id":req.query.style_id}).limit(req.query.limit).skip((req.query.page-1)*req.query.limit).done(function(err,products) {
      // body...
      if (err){
        console.log('error');
        return res.send(err,500);
      }else{
        if (!products || !products[0]) {
          console.log('not found');
          return res.status(404).send({
            message: 'Products not found'
          });
        }else{
          console.log(products.length);
          return res.json({products: products});
        }
      }
    });
  }

  // ,like: function(req, res) {

  // }



};
