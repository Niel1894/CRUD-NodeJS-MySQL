const pool = require('../database')

exports.getaddLinks = async(req, res) => {
  res.render('links/add');
}

exports.postaddLinks = async(req, res) => {
  res.send('received')
}