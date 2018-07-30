var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var config  =  require('../config/config.json');


    //api/videos/page
  router.get("/videos/:page",function(req,res){
    var page = req.params.page;
    var limit = 8;
    if(page>1){
      var start = (page-1)*limit;
    }
    else{
      page=1;
      var start = (page-1)*limit;
    }
    var db = new Database(config);
    db.query("SELECT * FROM videos a,categories b where a.categories_id=b.id ORDER BY a.id DESC limit ?,?",[start,limit]).then( rows => {
        // do something with the result
        //res.json(rows);
        var data = 
          {
            
            "results":rows
          };
        res.json(data);

    } );
   
    
  });
  //api/videos
  router.get("/videos",function(req,res){
    var db = new Database(config);
    db.query("SELECT * FROM videos a,categories b where a.categories_id=b.id").then( rows => { 
        res.json(rows);
    } );
  });

  //Class connect database
  class Database {
    constructor( config) {
        this.connection = mysql.createConnection( config);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


module.exports = router
