var mongo = require('mongodb');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


PetrolProvider = function (expressServer) {
  var server = new Server('ds039037.mongolab.com', 39037, {auto_reconnect: true});
  this.db = new Db('tankstellendb', server); 
  //this.db = new Db('TankstellenDB', new Server('localhost', 27017, {auto_reconnect: true}, {}));
  
  this.db.open(function(error, client) {
    if(!error) {
      client.authenticate('myUser', 'myUser', function(err, success) {
        if(!error) {
          console.log('Authentication succeeded');
        } else {
          console.log('Authentication failed');
        }
      });
    }else {
      console.log('Database could not be opened');    
    }
  });

  
  PetrolProvider.prototype.getCollection = function(callback) {
    this.db.collection('tankstelle', function(error, collection) {
      if(error) callback(error);
      else callback(null, collection);
    });
  };
  
  PetrolProvider.prototype.findAll = function(callback) {
    this.getCollection( function(error, collection) {
      if(error) callback(error);
      else {
        collection.find().toArray( function(error, results) {
          if(error) callback(error);
          else callback(null, results);
        });
      }
    });
  };
 
  PetrolProvider.prototype.findAllWithRadius = function(data, callback) {
    this.getCollection( function(error, collection) {
      console.log(data);
      if(error) callback(error);
      else {
        collection.find( { 'latLng' : { '$nearSphere' : [data.latitude,data.longitude] , '$maxDistance' : data.radius } }).toArray( function( error, results) {
          console.log(results);
          if(error) callback(error);
          else callback(null, results);
        });
        
      }
    });
  };


  PetrolProvider.prototype.insertDresden = function() {
    //this.db.createCollection('tankstelle', {safe:true}, function(err, collection) {});
    console.log('insert Dresden');
    var dresden = [{"name":"Esso Tankstelle","location":"Dresden","zip":1139,"street":"An der Duerren Heide","number":"1","type":"Esso","latLng":{"latitude":51.094049,"longitude":13.698725}},{"name":"HEM Tankstelle","location":"Dresden","zip":1159,"street":"Tharandter Strasse","number":"48","type":"HEM","latLng":{"latitude":51.0366013,"longitude":13.703371100000027}},{"name":"HEM Tankstelle","location":"Dresden","zip":1097,"street":"Hansastrasse","number":"72","type":"HEM","latLng":{"latitude":51.06916409999999,"longitude":13.73933199999999}},{"name":"ARAL Tankstelle","location":"Dresden","zip":687,"street":"Strasse des 17. Juni","number":"9","type":"ARAL","latLng":{"latitude":51.00666,"longitude":13.81889000000001}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1219,"street":"Dohnaer Strasse","number":"103","type":"ARAL","latLng":{"latitude":51.01424000000001,"longitude":13.774800000000027}},{"name":"Kaufland Tankstelle","location":"Dresden","zip":1239,"street":"Dohnaer Strasse","number":"246","type":"Kaufland","latLng":{"latitude":50.9978602,"longitude":13.799022700000023}},{"name":"SB Tankstelle","location":"Dresden","zip":1328,"street":"Am Hahnweg","number":"2","type":"SB","latLng":{"latitude":51.0653242,"longitude":13.895917899999972}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1099,"street":"Koenigsbruecker Strasse","number":"104","type":"TOTAL","latLng":{"latitude":51.0761413,"longitude":13.755050200000028}},{"name":"JET Tankstelle","location":"Dresden","zip":724,"street":"Bautzner Landstrasse","number":"158","type":"JET","latLng":{"latitude":51.06134369999999,"longitude":13.856177000000002}},{"name":"AGIP Tankstelle","location":"Dresden","zip":703,"street":"Enderstrasse","number":"92e","type":"AGIP","latLng":{"latitude":51.028258,"longitude":13.801050600000053}},{"name":"GO Tankstelle","location":"Dresden","zip":1187,"street":"Tharandter Strasse","number":"199","type":"GO","latLng":{"latitude":51.01698,"longitude":13.672599999999989}},{"name":"Shell Tankstelle","location":"Dresden","zip":671,"street":"Seidnitzer Weg","number":"2","type":"Shell","latLng":{"latitude":51.0125318,"longitude":13.799103100000025}},{"name":"Sprint Tankstelle","location":"Dresden","zip":687,"street":"Strasse des 17. Juni","number":"11","type":"Sprint","latLng":{"latitude":51.00601,"longitude":13.820010000000025}},{"name":"Shell Tankstelle","location":"Dresden","zip":1139,"street":"Washingtonstrasse","number":"40","type":"Shell","latLng":{"latitude":51.0732623,"longitude":13.690204799999947}},{"name":"ESSO Tankstelle","location":"Dresden","zip":623,"street":"Meissner Landstrasse","number":"94","type":"ESSO","latLng":{"latitude":51.08002,"longitude":13.659779999999955}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1129,"street":"Radeburger Srasse","number":"50","type":"ARAL","latLng":{"latitude":51.1549401,"longitude":13.793205199999989}},{"name":"STAR Tankstelle","location":"Dresden","zip":1219,"street":"Dohnaer Strasse","number":"90","type":"STAR","latLng":{"latitude":51.01618999999999,"longitude":13.77076999999997}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1069,"street":"Wiener Landstrasse","number":"39","type":"TOTAL","latLng":{"latitude":51.03652,"longitude":13.748590000000036}},{"name":"ARAL Tankstelle","location":"Dresden","zip":623,"street":"Hamburger Strasse","number":"88c","type":"ARAL","latLng":{"latitude":51.06206,"longitude":13.68101999999999}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":726,"street":"Grundstrasse","number":"99","type":"TOTAL","latLng":{"latitude":51.0581117,"longitude":13.82540789999996}},{"name":"AGIP Tankstelle","location":"Dresden","zip":1109,"street":"Flughafenstrasse","number":"81","type":"AGIP","latLng":{"latitude":51.1207,"longitude":13.76215000000002}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1139,"street":"Koetzschenbroder Strasse","number":"193","type":"ARAL","latLng":{"latitude":51.09226,"longitude":13.670319999999947}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1279,"street":"Oesterreicher Strasse","number":"64","type":"ARAL","latLng":{"latitude":51.0208184,"longitude":13.8405937}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1328,"street":"Bautzner Landstrasse","number":"246","type":"ARAL","latLng":{"latitude":51.061331,"longitude":13.869797999999946}},{"name":"JET Tankstelle","location":"Dresden","zip":1328,"street":"Loebtauer Strasse","number":"51","type":"JET","latLng":{"latitude":51.04696,"longitude":13.708949999999959}},{"name":"JET Tankstelle","location":"Dresden","zip":622,"street":"Kesselsdorfer Strasse","number":"336","type":"JET","latLng":{"latitude":51.03919,"longitude":13.638169999999946}},{"name":"Shell Tankstelle","location":"Dresden","zip":599,"street":"Leipziger Strasse","number":"125","type":"Shell","latLng":{"latitude":51.07858,"longitude":13.71437000000003}},{"name":"Shell Tankstelle","location":"Dresden","zip":1159,"street":"Loebtauer Strasse","number":"28","type":"Shell","latLng":{"latitude":51.05211,"longitude":13.714969999999994}},{"name":"ARAL Tankstelle","location":"Dresden","zip":599,"street":"Grossenhainer Strasse","number":"44","type":"ARAL","latLng":{"latitude":51.07675,"longitude":13.733529999999973}},{"name":"STAR Tankstelle","location":"Dresden","zip":599,"street":"Grossenhainer Strasse","number":"89","type":"STAR","latLng":{"latitude":51.0811183,"longitude":13.73041969999997}},{"name":"ESSO Tankstelle","location":"Dresden","zip":1187,"street":"Tharandter Strasse","number":"88","type":"ESSO","latLng":{"latitude":51.0298621,"longitude":13.700672800000007}},{"name":"ESSO Tankstelle","location":"Dresden","zip":1097,"street":"Leipziger Strasse","number":"2e","type":"ESSO","latLng":{"latitude":51.06655,"longitude":13.73424}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1169,"street":"Kesselsdorfer Strasse","number":"214","type":"TOTAL","latLng":{"latitude":51.0395735,"longitude":13.657062799999949}},{"name":"STAR Tankstelle","location":"Dresden","zip":1219,"street":"Reicker Strasse","number":"35","type":"STAR","latLng":{"latitude":51.02388999999999,"longitude":13.772531399999934}},{"name":"ARAL Tankstelle","location":"Dresden","zip":655,"street":"Bergstrasse","number":"121","type":"ARAL","latLng":{"latitude":51.02012,"longitude":13.730419999999981}},{"name":"SPRINT (Dynamo) Tankstelle","location":"Dresden","zip":687,"street":"Dohnaer Strasse","number":"280","type":"SPRINT","latLng":{"latitude":50.99323,"longitude":13.805420000000026}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1099,"street":"Bautzner Strasse","number":"72","type":"TOTAL","latLng":{"latitude":51.0644151,"longitude":13.764093799999955}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1108,"street":"Koenigsbruecker Landstrasse","number":"265","type":"TOTAL","latLng":{"latitude":51.14027000000001,"longitude":13.797310000000039}},{"name":"JET Tankstelle","location":"Dresden","zip":1139,"street":"Peschelstrasse","number":"36","type":"JET","latLng":{"latitude":51.0858935,"longitude":13.692383899999982}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1099,"street":"Koenigsbruecker Strasse","number":"136","type":"ARAL","latLng":{"latitude":51.09378,"longitude":13.767240000000015}},{"name":"STAR Tankstelle","location":"Dresden","zip":1239,"street":"Dohnaer Strasse","number":"184","type":"STAR","latLng":{"latitude":51.00483,"longitude":13.788189999999986}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1139,"street":"Werftstrasse","number":"13","type":"ARAL","latLng":{"latitude":51.0694759,"longitude":13.69695379999996}},{"name":"ESSO Tankstelle","location":"Dresden","zip":1139,"street":"An der Duerren Heide","number":"5","type":"ESSO","latLng":{"latitude":51.0939579,"longitude":13.698853699999972}},{"name":"ESSO Tankstelle","location":"Dresden","zip":1239,"street":"Langer Weg","number":"22","type":"ESSO","latLng":{"latitude":51.0059917,"longitude":13.808117799999991}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":703,"street":"Bodenbacher Strasse","number":"64","type":"TOTAL","latLng":{"latitude":51.02946,"longitude":13.790700000000015}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1309,"street":"Hueblerstrasse","number":"36","type":"TOTAL","latLng":{"latitude":51.04916000000001,"longitude":13.792900000000031}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":622,"street":"Dresdner Strasse","number":"49","type":"TOTAL","latLng":{"latitude":51.08721999999999,"longitude":13.640549999999962}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":567,"street":"Hamburger Strasse","number":"44","type":"TOTAL","latLng":{"latitude":51.06160999999999,"longitude":13.69354999999996}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":1187,"street":"Wuerzburger Strasse","number":"26","type":"TOTAL","latLng":{"latitude":51.0323443,"longitude":13.710945100000004}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":687,"street":"Langer Weg","number":"17","type":"TOTAL","latLng":{"latitude":51.0067818,"longitude":13.809278199999994}},{"name":"ESSO Tankstelle","location":"Dresden","zip":1139,"street":"Washingtonstrasse","number":"12","type":"ESSO","latLng":{"latitude":51.07895,"longitude":13.69046000000003}},{"name":"Shell Tankstelle","location":"Dresden","zip":1097,"street":"Hansastrasse","number":"60","type":"Shell","latLng":{"latitude":51.06916409999999,"longitude":13.73933199999999}},{"name":"ARAL Tankstelle","location":"Dresden","zip":1099,"street":"Fischhausstrasse","number":"15","type":"ARAL","latLng":{"latitude":51.07079,"longitude":13.787800000000061}},{"name":"TOTAL Tankstelle","location":"Dresden","zip":703,"street":"Bodenbacher","number":"64","type":"TOTAL","latLng":{"latitude":51.02946,"longitude":13.790700000000015}}];
    this.getCollection( function(error, collection) {
      if(error) {
        callback(error);
        console.log('error');
      }
      else {
        console.log('no error');
        collection.insert(dresden);
      }
    });
  }; 
  
};

exports.PetrolProvider = PetrolProvider;
  /*
   var db = mongo.connect(createMongoUrl(), function(error, connection) {
   console.log(createMongoUrl());
     if(error) {
       console.log('Connection Failed');
       console.log('Create new Database');
        //var server = new Server('localhost', 27017, {auto_reconnect: true});
        //var db = new Db('exampleDb', server);
     }else {
      connection.collection('test1', function(err, collection) {
        console.log('In Collection1 Handler');
        
        collection.find({}).toArray(function(err, items) {      
          for(var i = 0; i < items.length; i++) {
            console.log(items[i]);
            try{
              var json = JSON.parse(JSON.stringify(items[i]));
              console.log(json.hello);
            }catch(e) {
              console.log('Error parsing Json: '+e);
            }
          }
        });
      });
      
     }
  });
  */
    /*
  db.open(function(err, db) {
    if(!err) {
      console.log('We are connected');
    db.createCollection('test1', {safe:true}, function(err, collection) {
      if(!err){
        db.collection('test1', function(err, collection) {
        var doc1 = {"hello":"doc1"};
        var doc2 = {"hello":"doc2"};
        var lotsOfDocs = [{"hello":"doc3"}, {"hello":"doc4"}];
        
        
            collection.insert(doc1);
            collection.insert(doc2, {safe:true}, function(err, result) {});
            collection.insert(lotsOfDocs, {safe:true}, function(err, result) {});
        
        collection.find().toArray(function(err, items) {
          for(var item in items) {
          console.log(item +  ' ' +item.hello);
          
        }
        
        });
      });
      }else {
        console.log('Collection already exists');
        db.collection('test1', function(err, collection) {
          collection.find({}).toArray(function(err, items) {
            for(var i = 0; i < items.length; i++) {
              console.log(items[i]);
              try{
              var json = JSON.parse(JSON.stringify(items[i]));

              console.log(json.hello);
              }catch(e) {
                console.log('Error parsing Json: '+e);
              }
            }
          });
        });
      }
    });
    }else {
      console.log('Error');
    }
  });

}
  */
  
// zusätzliche Angaben wie Bistro, Kraftstoffsorte
/*  var tanke1 = {
    'name':'Aral Tankstelle',
    'location':'Freital',
    'zip':01705,
    'street':'Dresdner Strasse',
    'number':'166',
    'type':'Aral',
    'latLng':{
      'latitude':51.00186,
      'longitude':13.65035
    }
  }
  
  var tanke2 = {
    'name':'Total Tankstelle',
    'location':'Freital',
    'zip':01705,
    'street':'Poisentalstrasse',
    'number':'18-20',
    'type':'Total',
    'latLng':{
      'latitude':50.99617,
      'longitude':13.65215
    }
  }

  var tanke3 = {
    'name':'Freie Tankstelle',
    'location':'Freital',
    'zip':01705,
    'street':'Lutherstrasse',
    'number':'25',
    'type':'Freie',
    'latLng':{
      'latitude':51.0069413,
      'longitude':13.6483832
    }
  }

  var tanke4 = {
    'name':'Shell Tankstelle',
    'location':'Freital',
    'zip':01705,
    'street':'Wilsdruffer Strasse',
    'number':'54',
    'type':'Shell',
    'latLng':{
      'latitude':51.01484,
      'longitude':13.64568
    }
  }

  var tanke5 = {
    'name':'Esso Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'An der Dürren Heide',
    'number':'1',
    'type':'Esso',
    'latLng':{
      'latitude':51.094049,
      'longitude':13.698725
    }
  }

  var tanke6 = {
    'name':'HEM Tankstelle',
    'location':'Dresden',
    'zip':01159,
    'street':'Tharandter Strasse',
    'number':'48',
    'type':'HEM',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }

  var tanke7 = {
    'name':'HEM Tankstelle',
    'location':'Dresden',
    'zip':01097 ,
    'street':'Hansastrasse',
    'number':'72',
    'type':'HEM',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }

  var tanke8 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Straße des 17. Juni',
    'number':'9',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }  
  
  var tanke9 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Dohnaer Strasse',
    'number':'103',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }  
   
  var tanke10 = {
    'name':'Kaufland Tankstelle',
    'location':'Dresden',
    'zip':01239,
    'street':'Dohnaer Strasse',
    'number':'246',
    'type':'Kaufland',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }  
  
  var tanke12 = {
    'name':'SB Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Am Hahnweg',
    'number':'2',
    'type':'SB',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }  
  
  var tanke13 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Königsbrücker Strasse',
    'number':'104',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke14 = {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01324,
    'street':'Bautzner Landstrasse',
    'number':'158',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke15 = {
    'name':'AGIP Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Enderstrasse',
    'number':'92e',
    'type':'AGIP',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke16 = {
    'name':'GO Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Tharandter Strasse',
    'number':'199',
    'type':'GO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke17 = {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01237,
    'street':'Seidnitzer Weg',
    'number':'2',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke18 = {
    'name':'Sprint Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Straße des 17. Juni',
    'number':'11',
    'type':'Sprint',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke19 = {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Washingtonstrasse',
    'number':'40',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke20 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01157,
    'street':'Meißner Landstrasse',
    'number':'94',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke21 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01129,
    'street':'Radeburger Srasse',
    'number':'50',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke22 = {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Dohnaer Strasse',
    'number':'90',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke23 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01069,
    'street':'Wiener Landstrasse',
    'number':'39',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke24 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01157,
    'street':'Hamburger Strasse',
    'number':'88c',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke25 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01326,
    'street':'Grundstrasse',
    'number':'99',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke26 = {
    'name':'AGIP Tankstelle',
    'location':'Dresden',
    'zip':01109,
    'street':'Flughafenstrasse',
    'number':'81',
    'type':'AGIP',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke27 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Kötzschenbroder Strasse',
    'number':'193',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke28 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01279,
    'street':'Österreicher Strasse',
    'number':'64',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke29 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Bautzner Landstrasse',
    'number':'246',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke30 = {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Löbtauer Strasse',
    'number':'51',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke31 = {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01156,
    'street':'Kesselsdorfer Strasse',
    'number':'336',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke32 = {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Leipziger Strasse',
    'number':'125',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke33 = {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01159,
    'street':'Löbtauer Strasse',
    'number':'28',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke34 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Großenhainer Strasse',
    'number':'44',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke35 = {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Großenhainer Strasse',
    'number':'89',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke36 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Tharandter Strasse',
    'number':'88',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke37 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01097,
    'street':'Leipziger Strasse',
    'number':'2e',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke38 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01169,
    'street':'Kesselsdorfer Strasse',
    'number':'214',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke39 = {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Reicker Strasse',
    'number':'35',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke40 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01217,
    'street':'Bergstrasse',
    'number':'121',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke41 = {
    'name':'SPRINT (Dynamo) Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Dohnaer Strasse',
    'number':'280',
    'type':'SPRINT',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke42 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Bautzner Strasse',
    'number':'72',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke43 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01108,
    'street':'Königsbrücker Landstrasse',
    'number':'265',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke44 = {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Peschelstrasse',
    'number':'36',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke45 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Königsbrücker Strasse',
    'number':'136',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke46 = {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01239,
    'street':'Dohnaer Strasse',
    'number':'184',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke47 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Werftstrasse',
    'number':'13',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke48 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'An der Dürren Heide',
    'number':'5',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke49 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01239´,
    'street':'Langer Weg',
    'number':'22',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke50 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Bodenbacher Strasse',
    'number':'64',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke51 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01309,
    'street':'Hüblerstrasse',
    'number':'36',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke52 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01156,
    'street':'Dresdner Strasse',
    'number':'49',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke53 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01067,
    'street':'Hamburger Strasse',
    'number':'44',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke54 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Würzburger Strasse',
    'number':'26',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke55 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Langer Weg',
    'number':'17',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke56 = {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Washingtonstrasse',
    'number':'12',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke57 = {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01097,
    'street':'Hansastrasse',
    'number':'60',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke58 = {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Fischhausstrasse',
    'number':'15',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }
  
  var tanke59 = {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Bodenbacher',
    'number':'64',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    } 
  }
  *//*
var dresden = [ {
    'name':'Esso Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'An der Dürren Heide',
    'number':'1',
    'type':'Esso',
    'latLng':{
      'latitude':51.094049,
      'longitude':13.698725
    }
  }, {
    'name':'HEM Tankstelle',
    'location':'Dresden',
    'zip':01159,
    'street':'Tharandter Strasse',
    'number':'48',
    'type':'HEM',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'HEM Tankstelle',
    'location':'Dresden',
    'zip':01097 ,
    'street':'Hansastrasse',
    'number':'72',
    'type':'HEM',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Straße des 17. Juni',
    'number':'9',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Dohnaer Strasse',
    'number':'103',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Kaufland Tankstelle',
    'location':'Dresden',
    'zip':01239,
    'street':'Dohnaer Strasse',
    'number':'246',
    'type':'Kaufland',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'SB Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Am Hahnweg',
    'number':'2',
    'type':'SB',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Königsbrücker Strasse',
    'number':'104',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01324,
    'street':'Bautzner Landstrasse',
    'number':'158',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'AGIP Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Enderstrasse',
    'number':'92e',
    'type':'AGIP',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'GO Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Tharandter Strasse',
    'number':'199',
    'type':'GO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01237,
    'street':'Seidnitzer Weg',
    'number':'2',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Sprint Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Straße des 17. Juni',
    'number':'11',
    'type':'Sprint',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Washingtonstrasse',
    'number':'40',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01157,
    'street':'Meißner Landstrasse',
    'number':'94',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01129,
    'street':'Radeburger Srasse',
    'number':'50',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Dohnaer Strasse',
    'number':'90',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01069,
    'street':'Wiener Landstrasse',
    'number':'39',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01157,
    'street':'Hamburger Strasse',
    'number':'88c',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01326,
    'street':'Grundstrasse',
    'number':'99',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'AGIP Tankstelle',
    'location':'Dresden',
    'zip':01109,
    'street':'Flughafenstrasse',
    'number':'81',
    'type':'AGIP',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Kötzschenbroder Strasse',
    'number':'193',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01279,
    'street':'Österreicher Strasse',
    'number':'64',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Bautzner Landstrasse',
    'number':'246',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01328,
    'street':'Löbtauer Strasse',
    'number':'51',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01156,
    'street':'Kesselsdorfer Strasse',
    'number':'336',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Leipziger Strasse',
    'number':'125',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01159,
    'street':'Löbtauer Strasse',
    'number':'28',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Großenhainer Strasse',
    'number':'44',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01127,
    'street':'Großenhainer Strasse',
    'number':'89',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Tharandter Strasse',
    'number':'88',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01097,
    'street':'Leipziger Strasse',
    'number':'2e',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01169,
    'street':'Kesselsdorfer Strasse',
    'number':'214',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01219,
    'street':'Reicker Strasse',
    'number':'35',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01217,
    'street':'Bergstrasse',
    'number':'121',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'SPRINT (Dynamo) Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Dohnaer Strasse',
    'number':'280',
    'type':'SPRINT',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Bautzner Strasse',
    'number':'72',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01108,
    'street':'Königsbrücker Landstrasse',
    'number':'265',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'JET Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Peschelstrasse',
    'number':'36',
    'type':'JET',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Königsbrücker Strasse',
    'number':'136',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'STAR Tankstelle',
    'location':'Dresden',
    'zip':01239,
    'street':'Dohnaer Strasse',
    'number':'184',
    'type':'STAR',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Werftstrasse',
    'number':'13',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'An der Dürren Heide',
    'number':'5',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01239´,
    'street':'Langer Weg',
    'number':'22',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Bodenbacher Strasse',
    'number':'64',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01309,
    'street':'Hüblerstrasse',
    'number':'36',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01156,
    'street':'Dresdner Strasse',
    'number':'49',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01067,
    'street':'Hamburger Strasse',
    'number':'44',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  },{
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01187,
    'street':'Würzburger Strasse',
    'number':'26',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  },{
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01257,
    'street':'Langer Weg',
    'number':'17',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  },{
    'name':'ESSO Tankstelle',
    'location':'Dresden',
    'zip':01139,
    'street':'Washingtonstrasse',
    'number':'12',
    'type':'ESSO',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'Shell Tankstelle',
    'location':'Dresden',
    'zip':01097,
    'street':'Hansastrasse',
    'number':'60',
    'type':'Shell',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'ARAL Tankstelle',
    'location':'Dresden',
    'zip':01099,
    'street':'Fischhausstrasse',
    'number':'15',
    'type':'ARAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }, {
    'name':'TOTAL Tankstelle',
    'location':'Dresden',
    'zip':01277,
    'street':'Bodenbacher',
    'number':'64',
    'type':'TOTAL',
    'latLng':{
      'latitude':,
      'longitude':
    }
  }]
  */

