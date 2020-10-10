const Server = require('@skuyjs/http-server');
const auth = require('..')({
});

const server = new Server();

server.get('/', auth, (req, res) => {
  if (req.error) {
    return res.status(400).json({
      error: req.error,
    })
  }
  
  return res.json({
    message: 'welcome',
    jwtData: req.user,
  });
});

server.listen(8080);
