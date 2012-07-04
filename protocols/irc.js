var Client = require('./../node-irc').Client,

    chan = '#offtopic',
    host = 'irc.tenthbit.net';

exports.start = function(socket, callback) {
  var client, server;

  return {
    nick: function(nick) {
      client = new Client(nick);
      server = client.connect(host);

      client.on('PING', function(e) {
        e.server.send('pong', e.params);
      });

      client.on('001', function(e) {
        callback('connected');
        e.server.join(chan);
      });

      client.on('353', function(e) {
        callback('names', [e.params[2], e.params[3]]);
      });

      client.on('PRIVMSG', function(e) {
        callback('message', e);
      });
    },
    message: function(message) {
      server.message(chan, message);
    }
  };
}
