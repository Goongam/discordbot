const Discord = require("discord.js");
const client = new Discord.Client();
 
var rmawl = ['붕괴','옵치','오버워치','메이플','불도저','honkai','금지어1',];

client.on("ready", () => {
  console.log("준비 완료!");
 
});
 


client.on("message", message => {

    if (message.author.bot) return;

    if (message.content === '!pinga') {
    message.channel.send("Hello").then((neMessage) => {neMessage.edit("Edited!");});
    }

    //---핑---
    if (message.content === '!ping') {
    message.reply('`'+Math.floor(client.ping) + ' ms`');
    }
    if (message.content === '뚱수야 자소서써와') {
        message.reply("넹");
        }
    //-------금지어--------
    var rmawlmsg = message.content;
    rmawlmsg = rmawlmsg.replace(/ /gi, "")
    
    for(i = 0; i < rmawl.length;i++){
        if (rmawlmsg.indexOf(rmawl[i]) != -1){
            message.delete()
            message.channel.send("금지어가 감지되었습니다! ").then((newMsg) => {newMsg.delete(5000);})
            return;
          }
    }

    if(message.content.indexOf("호") != -1){
        message.delete()
        message.channel.send("'호'가 감지되었습니다! ").then((newMsg) => {newMsg.delete(5000);})
        return;
    }

    if (message.content.split(" ")[0] == "!금지어") {
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: "금지어 목록",
              icon_url: client.user.avatarURL
            },
            title: rmawl.join(', '),
            //fields: [{
            //    name: "Fields",
            //    value: "They can have different fields with small headlines."
            //  }, 
            //],
            timestamp: new Date(),
            //footer: {
            //  icon_url: client.user.avatarURL,
            //  text: "© Example"
            //}
          }
        });
      }
//-------사다리타기--------
  if (message.content.split(" ")[0] == "!사다리타기") {
    message.reply(ladder(message.content.split(" ")));
  }
//-------롤전적--------
  if (message.content.split(" ")[0] == "!롤전적") {
  //message.reply(lol(message.content.split(" ")[1]));

    wjswjr = "찾는 닉네임이 없습니다.";
    

    lol(message.content.substring(5,message.content.length));
    
    //시간지연 및 메시지
    setTimeout(function() {
        message.reply(wjswjr);
      }, 3000);
    
  
}

//-------기타--------
switch (message.content.split(" ")[0]) {
    case "뚱수임?":
    message.channel.send("재능수임~");
        break;
    case "재능수임?":
    message.channel.send("뚱수임~");
        break;
    default:
        break;
}
});
 
client.login("NTAxMDAwNTA1MDcwMTkwNjAx.DqTBRQ.lWJUglUKK7M_he3pMKdRR1R1wT4");

//--------------------------------롤전적------------------------------------
function lol(nick){

    console.log(nick);

    var RiotRequest = require('riot-lol-api');
 
    var riotRequest = new RiotRequest('RGAPI-24377926-84d7-43cb-9bc7-0322696e8f1f');
 
    var urlencode = require('querystring');
    var urlc = urlencode.escape(nick);
    
    riotRequest.request('KR', 'summoner', '/lol/summoner/v3/summoners/by-name/'+urlc, function(err, data) {  //닉네임 -> 소환사 id 추출
        var d = data;    
        
        if(d.summonerLevel == undefined){ //닉네임이 없을경우.
            return;
        }
	    riotRequest.request('KR', 'league', '/lol/league/v3/positions/by-summoner/'+d.id, function(err, data2) {//id -> 리그 데이터 추출

                var solo_point="",solo_rank="",solo_tier="",solo_losses="",solo_wins="",
                flex_point="",flex_rank="",flex_tier="",flex_losses="",flex_wins="";    //표시될 변수 선언 및 초기화

            try {
                var solotype = 1, flextype= 0; //솔로, 랭크
                var lea = data2;    

                var solo_str ="\n"+ nick+"("+d.summonerLevel+"Lv)" + " 님의 전적\n";  //표시될 변수 선언 및 초기화
                var flex_str ="오류"                                                    //표시될 변수 선언 및 초기화

                if(lea[0] != undefined){
                    if(lea[0].queueType == "RANKED_SOLO_5x5"){
                        solotype = 0;
                        flextype = 1;
                    }
                }else if(lea[1] != undefined){
                    if(lea[1].queueType == "RANKED_SOLO_5x5"){
                        
                    }else{
                        solotype = 0;
                        flextype = 1;
                    }
                }else{
                    wjswjr = solo_str+"해당 플레이어는 랭크가 없습니다.";
                    return;
                }

                if(lea[0] != undefined){
                
                 solo_point = JSON.stringify(lea[solotype].leaguePoints).split("\"");
                 solo_rank = JSON.stringify(lea[solotype].rank).split("\"")[1];   
                 solo_tier = JSON.stringify(lea[solotype].tier).split("\"")[1];
                 solo_losses = Number(JSON.stringify(lea[solotype].losses));
                 solo_wins =Number(JSON.stringify(lea[solotype].wins));               
                }
                if(lea[1] != undefined){
                  
                 flex_point = JSON.stringify(lea[flextype].leaguePoints).split("\"");
                 flex_rank = JSON.stringify(lea[flextype].rank).split("\"")[1];   
                 flex_tier = JSON.stringify(lea[flextype].tier).split("\"")[1];
                 flex_losses = Number(JSON.stringify(lea[flextype].losses));
                 flex_wins =Number(JSON.stringify(lea[flextype].wins));     
                }
                solo_str += "솔로랭크 : ["+solo_tier +" "+ solo_rank +"] "+solo_point+"p  |  "+
                                "승률 : "+((solo_wins/(solo_losses+solo_wins)).toFixed(2)*100).toFixed(0)+"%\n";

                flex_str = "자유랭크 : ["+flex_tier +" "+ flex_rank +"] "+flex_point+"p  |  "+
                                "승률 : "+((flex_wins/(flex_losses+flex_wins)).toFixed(2)*100).toFixed(0)+"%\n";;
                
                wjswjr = solo_str+flex_str;
               
            } catch (error) {     
                wjswjr = "알 수 없는 오류 : "+error;
                return;
            }

	    	});
          
    });

}

//-------------------------------- 사다리타기 ----------------------------------
function Makeladder(up,down) {
   
   var line = "";
   var str = "\n";
   var prev = false;
   
   
for(var j=0;j<7;j++) {
   
   for (var i = 0; i < up.length-1; i++) {
       
       if(prev) {
           
           line += "┤";
           line += "            ";
           prev = false;
       }else {
           if(Math.random() >= 0.5) {
               line += "├";
               line += "───";
               prev = true;
           }else {
               line += "│";
               line += "            ";
               prev = false;
           
           }
       }
       
   }
   
   if(prev) {
       line += "┤";
   }else {
       line += "│";
   }
   line += "\n";
   prev =false;
   
}

       

   for (var i = 0; i < up.length; i++) {
       if(i>0) str += "    ";
       str += (i+1)+" : "+up[i];
   }
   
   //1 2 3 4 5 6 7
   str += "\n\n ";
   for (var i = 0; i < up.length; i++) {
       
       if(i < 6) {str += i+1 + "              ";}else if(i < 10){str += i+1 + "            ";}else {str += i+1 + "            ";}
   }
   
   str += "\n"+line;
   
   //A B C D E F G
   for (var i = 0; i < down.length; i++) {
       
       if(i < 5) {str += String.fromCharCode(i+65)+"             ";}else if(i < 12){str += String.fromCharCode(i+65)+"              ";}else {str += String.fromCharCode(i+65)+"            ";}
   }
   
   str += "\n\n";
   for (var i = 0; i < down.length; i++) {
       if(i>0) str += "     ";
       str += String.fromCharCode(i+65)+" : "+down[i];
   }
   

   
   
   
   return str;
}

function ladder(ary) {
   

   var str1 = "";
   var str2 = "";
   var upary = [];
   var downary = [];
   
   
   if(ary[0] == "!사다리타기") {
       
       if(ary.length %2 == 1) {
       
       for (var i = 1; i < ary.length; i++) {
           
           if(ary[i].length <= 5) {
               
               if(i%2 == 0) downary.push(ary[i]);	
               else upary.push(ary[i]);					
               
           }else {
               return "문자의 길이는 최대 5글자 까지 입니다 : "+ary[i];
           }
           
           }
       }else {
           
           return "짝이 맞지 않습니다.";
           
       }
       
   }
   console.log(downary+upary);
   return Makeladder(upary, downary);

}
//------------------------사다리타기 ---------------------------------------------------------







