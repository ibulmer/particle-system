//this file defines the wind object. can be extended to add more weather events.

var wind = {
    speed:1,
    direction:'right'
}
$(document).ready(function(){
  $('#wind-faster').on('click', function(){
    if(wind.direction==="right"&&wind.speed<10){
      wind.speed++;
    }
    if(wind.direction==='left'&&wind.speed>-10){
      wind.speed--;
    }
  });
  $('#wind-slower').on('click', function(){
    if(wind.speed>0){
      wind.speed--;
    }
    if(wind.speed<0){
      wind.speed++;
    }
  });
  $('#wind-direction').on('click', function(){
    wind.speed*=-1;
    if(wind.direction==='right'){
      wind.direction='left';
    } else if (wind.direction==='left') {
      wind.direction='right';
    }
  });

});