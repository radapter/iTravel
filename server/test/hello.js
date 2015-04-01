var fourSquare = (require('../utils/fourSquare'))("Z4K0IZ0P0UOLQ5DRTP4LLU32TJVTAP50MFKEKXOP5NAPFFEK", "JXZT5MFR54XBZFHLQ440UQGSRVXQNJ42C33QDH1VL2GA0YDD");

var section = ['food', 'drinks', 'coffee', 'shops', 'arts', 'outdoors', 'sights'
  ,'trending', 'specials', 'nextVenues', 'topPicks'];

/*
fourSquare.explore({"ll":"37.3,-121.88"}, function(error, body){
  // console.log(JSON.stringify(body, null, 4));
});

fourSquare.explore({"near":"San Jose, CA"}, function(error, body){
  // console.log(JSON.stringify(body, null, 4));
});
//*/
var i = 0;
for(i=0; i<section.length; i++){
  var secName = section[i];
  fourSquare.explore({"near":"San Jose, CA", "section":secName}, function(error, body, sec = secName){
    console.log("----------- " + sec + " ------------");
    // console.log(JSON.stringify(body, null, 4));
  });
}


// var test = function(callback){
//   var stop = new Date().getTime();
//   while(new Date().getTime() < stop + 1000) {
//       ;
//   }
//   test2(callback);
// }
// var test2 = function(callback){
//   callback("data");
// }
//
// for(var i=0; i<10; i++){
//   console.log(i);
//   test(function(data){
//     console.log(data + ":" + i);
//     console.log(section[i]);
//   });
// }
