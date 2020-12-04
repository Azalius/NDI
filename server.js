const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient


connectionString = "mongodb+srv://mateo1998:mateo1998@cluster0.f8665.mongodb.net/surf?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
  const db = client.db('surf')
  const dbWaterman = db.collection('waterman')
  const dbSpot = db.collection('spot')
  const dbReview = db.collection('review')
 console.log('Connected to Database')

  app.set('view engine', 'ejs')
  app.get('/', (req, res) => {
    rev = dbReview.find()
    rev.toArray().then(results=>{
      spots=dbSpot.find().toArray().then(spots=>{
        res.render('index.ejs', {reviews:results, spots:spots, spot:req.query.spot})
      }).catch(error => console.error(error))
    })
    .catch(error => console.error(error))

  })

  app.listen(3000, function() {
    console.log('listening on 3000')
})

}).catch(error => console.error(error))
