var fs = require('fs')

module.exports = {

  getQrImage: function(req, res){
    req.params.name;

    var img = fs.readFileSync('./assets/qr_images/' + req.params.name);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');  
  }
}
