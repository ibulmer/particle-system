//set the background image
var background = new Image();
background.src = "/images/night.jpg"

//main function handling canvas creation and precipitation animation
function createCanvas(){
  //select the canvas element
  var ctx = document.getElementById('canvas').getContext('2d');
  var cW = ctx.canvas.width, cH = ctx.canvas.height;
  //the collection of particles
  var particles = [];
  //creates function factory to create click handlers to switch between elements
  function maker(target){
    $('#'+ target.name).on('click', function(){
        //console.log('snow');
        if(target.name!==particle.name){
          particle.name = target.name;
          for (var key in particle){
            //console.log('they key is ', target.obj[key])
            //console.log('the key is ', snow[key]);
            particle[key] = target[key];
            particles = [];
            precipitates();
          }
        }
    });
    $("#" + target.name).mouseup(function(){
      $(this).blur();
    });
  }
  //create a button for every element
  for (var i=0; i<elements.length; i++){
    maker(elements[i]);
  }
  //function to add particles to the particle array
  function addParticle(){
    var x = Math.floor(Math.random() * cW)+1;
    var y = Math.floor(Math.random() * cH)+1;
    var size = Math.floor(Math.random() * 5)/particle.size+1;;
    particles.push({'x':x,'y':y,'size':size});
  }
  //function to draw the particles
  function precipitates(){
    var particleLimit = 1000;
    while(particles.length<particleLimit){
      addParticle();
    }
    //draw the particles
    for (var i = 0; i < particles.length; i++ ){
      //set the color and the opacity
      ctx.fillStyle = 'rgba(255,255,255,'+ particle.opacity+')';
      ctx.beginPath();
      //x position of the particle is a function of wind speed, the y position is a function of the particle speed
      ctx.arc(particles[i].x+=wind.speed, particles[i].y+=particles[i].size*particle.speed, particles[i].size, 0, Math.PI*2, false);
      ctx.fill();
      //implement edge wrapping
      if(particles[i].x > cW|| particles[i].y >cH){
        //reset the particles y position;
        yMoves = Math.floor(particles[i].y/(particles[i].size*particle.speed))+1;
        particles[i].x = particles[i].x-yMoves*wind.speed;
        particles[i].y=0;

      }
    }
  }
  //function to draw the animation
  function animate(){
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(background,0,0);
    precipitates();
    ctx.restore();
  }
  var animateInterval = setInterval(animate, 30);
  var paused = false;
  //create button to pause the animation
  $('#pause').on('click', function(){
    //paused = true;
    if(paused){
      $('#pause').text('Paue');
      paused = false;
      for (var i=0; i<elements.length; i++){
        maker(elements[i]);
      }
      animateInterval = setInterval(animate, 30);
    } else {
      $('#pause').text('Resume');
      paused = true;
      console.log('paused')
      clearInterval(animateInterval);
      function turnOff(target){
        $(target).off();
      }
      for (var i=0; i<elements.length; i++){
        var target = '#'+elements[i].name;
        console.log('the target is ', target);
        turnOff(target);
      }
    }
    $("#pause").mouseup(function(){
      $(this).blur();
    });
  });
}
$(document).ready(function(){
  //create canvas when the document has loaded
  createCanvas();
});