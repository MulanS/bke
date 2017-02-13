//Js opdracht van Mulan Steert klas 4-1a
//Er zijn een aantal dingen die ik niet werkend kreeg of waar ik geen tijd meer voor had.
//wanneer er een 3 op een rij word gemaakt door bijvoorbeeld player1 krijg je dat pas 1 klik later te zien.
//De code die gelijkspel zou moeten doen zorgt ervoor dat bij elke klik waaring niemand wint er een gelijkspel komt.
//Clearen van het speelveld wanneer iemand wint werkt nog niet.
//Scores gaan alleen naar player1.
//Het liefst zou ik hem hellemaal opnieuw doen :#


var BUTTON_ELEMENT = document.getElementsByClassName('game-button')[0];
 var TURN_PLAYERIMAGE_ELEMENT =
     document.getElementsByClassName('players-turn')[0].getElementsByTagName('img')[0];
 var TURN_PLAYERNUMBER_ELEMENT =
     document.getElementsByClassName('players-turn')[0].getElementsByTagName('td')[2];
 var SCORE_PLAYER1_ELEMENT =
     document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[1];
 var SCORE_PLAYER2_ELEMENT =
     document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[3];
 var CURRENT_ROUND_ELEMENT =
     document.getElementsByClassName('rounds-info')[0].getElementsByTagName('td')[5];
 var GAME_FIELD_ELEMENT =
     document.getElementById('speelveld').getElementsByTagName('img');

 var PLAYER_IMAGES = [ 'img/empty.jpg', 'img/cross.jpg', 'img/circle.jpg' ];
 //                          0                 1                2

 var turn_player = 0;        // Deze verwijst ook naar de afbeelding in PLAYER_IMAGES
 var score_player1 = 0;
 var score_player2 = 0;
 var current_round = 0;


 window.onload = function() {
     // Klikbaar maken van de button
     BUTTON_ELEMENT.onclick = buttonClickHandler;

     // Bepalen welke speler mag beginnen
     turn_player = Math.round( Math.random() + 1);

     // Tonen welke speler mag beginnen
     TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[turn_player];
     TURN_PLAYERNUMBER_ELEMENT.innerHTML = turn_player;
     clearGameField();

 }
//functie voor het clearen van het veld
 function clearGameField(){
     for(var celnum = 0; celnum < 9; celnum++) {
         GAME_FIELD_ELEMENT(celnum).src = PLAYER_IMAGES[0];
     }
 }

 function buttonClickHandler() {
     //wanneer de button start spel aangeeft
   if(BUTTON_ELEMENT.innerText == "Start spel"){
     // 1. Ronde verhogen en tonen
     current_round = current_round + 1;                  // Verhogen
     CURRENT_ROUND_ELEMENT.innerHTML = current_round;    // Tonen in het element

     // 2. Tekst op de button veranderen in 'Reset spel'
     BUTTON_ELEMENT.innerHTML = 'Reset spel';

     // 3. Speelveld/cellen klikbaar maken
     for(celnum = 0; celnum < 9; celnum++) {
         GAME_FIELD_ELEMENT[celnum].onclick = cellClickHandler;
     }
   }
   //wanneer de button niet start spel aangeeft, in dit geval reset spel
   else {
     BUTTON_ELEMENT.onclick = buttonClickHandler;

    //scores resetten
     score_player1 = 0;
     score_player2 = 0;
     current_round = 0;

     // opnieuw bepalen welke speler mag beginnen
     turn_player = Math.round( Math.random() + 1);

     // opnieuw tonen welke speler mag beginnen
     TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[turn_player];
     TURN_PLAYERNUMBER_ELEMENT.innerHTML = turn_player;

       //cellen leeg maken
     for(celnum = 0; celnum < 9; celnum++) {
       GAME_FIELD_ELEMENT[celnum].src = PLAYER_IMAGES[0];

    //button text weer naar start spel doen
     BUTTON_ELEMENT.innerHTML = "Start spel";
     SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;
     SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
     }
   }
 }

 function cellClickHandler(event_info) {
     // Als de cel leeg is? Dan gaan we plaatje tonen in de cel en
     // Beurt overdragen, beurt informatie tonen op het scherm
     if(event_info.target.src.search('img/empty.jpg') > -1) {
         // Gevonden, dus de cel is leeg

         // Nu gaan we kijken wie wint
         if (checkWinner(1)) {
             alert("speler 1 wint");
             clearGameField();
             score_player1++;
             SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;
             current_round ++;
             CURRENT_ROUND_ELEMENT.innerHTML = current_round;

         }

         else if(checkWinner(2)) {
             alert("speler 2 wint");
             clearGameField();
             score_player2++;
             SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
             current_round ++;
             CURRENT_ROUND_ELEMENT.innerHTML = current_round;

         }

 //draw werkt een soort van.... kan er niet achter komen wat er fout mee gaat.
         // else if(draw){
         //     alert("gelijkspel");}

         // Afbeelding in de cel tonen van de speler die aan de beurt is
         event_info.target.src = PLAYER_IMAGES[ turn_player ];

         // Beurt overdragen
         if(turn_player == 1)
             turn_player = 2;
         else
             turn_player = 1;

         // Op het scherm tonen wie nu aan de beurt is
         TURN_PLAYERNUMBER_ELEMENT.innerHTML = turn_player;              // Nummer
         TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[ turn_player ];    // Afbeelding
     }

 }
 function checkWinner(PLAYER_NUM) {
     // cel 0,1,2 checken
     if(
         GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 3,4,5 checken
     if(
         GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 6,7,8 checken
     if(
         GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 0,3,6 checken
     if(
         GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 1,4,7 checken
     if(
         GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 2,5,8 checken
     if(
         GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 0,4,8 checken
     if(
         GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;
     // cel 2,4,6 checken
     if(
         GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1 &&
         GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[PLAYER_NUM]) > -1)
         return true;

     return false;
 }


 //draw werkt een soort van.... kan er niet achter komen wat er fout mee gaat.
 // function draw(){
 //     var return_value= true;
 //
 //     for(getal = 0; getal < 9; getal++) {
 //       if(GAME_FIELD_ELEMENT[getal].src.search(PLAYER_IMAGES[0]) >-1){
 //           return_value = false;
 //           break;
 //       }
 //     }
 //     return return_value;
 // }