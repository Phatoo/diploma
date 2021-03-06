var fs = require('fs')

module.exports = {

  getQrImage: function(req, res){
    sails.log.debug('getQrImage');

    req.params.name;

    if (fs.existsSync('./assets/qr_images/' + req.params.name)) {
      fs.readdir('./assets/qr_images' , function(err, files) {
        sails.log.verbose('files in qr_images directory:', files);

        var img = fs.readFileSync('./assets/qr_images/' + req.params.name);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');


      })
    } else {
      res.send(404);
    }

    //todo, get qr id, then, get qr model, then get imgData and imgContentType, send to user

  },
  saveQrImage: function() {


  }
}
