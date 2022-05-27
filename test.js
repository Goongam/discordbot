/*
var RiotRequest = require('riot-lol-api');
 
var riotRequest = new RiotRequest('RGAPI-dfd5a19d-155e-4596-9bf0-f28ae388a218');
 
var urlencode = require('querystring');
var urlc = urlencode.escape("별장남");
// 'summoner' is a string to identify the method being used currently
// See note about rate-limiting in the README.
// Also see https://developer.riotgames.com/rate-limiting.html#method-headers


riotRequest.request('KR', 'summoner', '/lol/summoner/v3/summoners/by-name/'+urlc, function(err, data) {
	var d = data;
	console.log(d);
	console.log(d.name, d.id);

	riotRequest.request('KR', 'league', '/lol/league/v3/positions/by-summoner/'+d.id, function(err, data) {
			console.log(JSON.stringify(data));
			var lea = new Array();
			lea = data;
			console.log(lea);
		});
	  
});

*/


console.log("1");

ab = 1 ;
a();
function a(){

	var ab = 2;
	console.log("4");
	console.log("a함수 : "+ab);
}
console.log("5");
console.log("밖 : "+ab);