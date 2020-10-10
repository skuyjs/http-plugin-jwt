const jwt = require('jsonwebtoken');

const defaultconfig = {
  secret: 'abcdefghijklmnopqrstuvwxyz0123456789',
};

function PluginJWT(config={}) {
  PluginJWT.config = {
    ...defaultconfig,
    ...config,
  };

  return build;
}

PluginJWT.getConfig = function getConfig(name) {
  return !!name ? PluginJWT.config[name] : PluginJWT.config;
}

function build(req, res) {
  const tokenRaw = req.headers['authorization'] || req.headers['Authorization'];
  if (tokenRaw) {
    const tokenSplitted = tokenRaw.split(' ');
    if (tokenSplitted.length < 2) {
      req.error = "invalid token";
    } else {
      const token = tokenSplitted[1];
      req.user = jwt.verify(token, PluginJWT.getConfig('secret'))
    }
    return;
  }

  req.error = "not authorized";
};

module.exports = PluginJWT;
