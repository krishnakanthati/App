const Clarifai = require('clarifai');
// https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
const app = new Clarifai.App({
  apiKey: '71247749fbf140c7b8d10384d3bc3ca1'
 });
 const handleApiCall = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
 }
 
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}