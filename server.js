const url = require('url');

const http = require('http');

const fs = require('fs');

const Jimp = require('jimp');

http.createServer((req, res) => {
    console.log(url.parse(req.url, true).path)
    //Desplegar formulario
    if (url.parse(req.url, true).path === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      fs.readFile('index.html', 'utf8', (err, html) => {
        res.end(html)
      })
    }
    // Desplegar css
    if (req.url == '/styles') {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      })
      fs.readFile('styles.css', (err, css) => {
        res.end(css)
      })
    }
    //Desplegar image
    if (req.url.includes('/image')) {
      const params = url.parse(req.url, true).query

      console.log(params);
      Jimp.read(params.imgUrl, (err, img) => {
        if (err) throw err
        img
          .resize(350, Jimp.AUTO)
          .quality(60)
          .greyscale()
          .writeAsync('newImg.jpg')
          .then(() => {
            fs.readFile('newImg.jpg', (err, image) => {
              res.writeHead(200, {
                'Content-Type': 'image/jpeg'
              })
              res.end(image)
            })
          })
      })
    }

  })
  .listen(8080, () => console.log('Escuchando el puerto 8080 '))