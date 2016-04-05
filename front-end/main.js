var background = new Image();
background.src = "/images/night.jpg"

function createCanvas(){
  var ctx = document.getElementById('canvas').getContext('2d');
  var cW = ctx.canvas.width, cH = ctx.canvas.height;
  //the collection of particles

  var particles = [];

  //a specific particle
  var particle = {
    speed: 6,
    size: 3,
    wind: {speed:1},
    opacity: .1,
  };

  //the parameters for rain
  var rain = {
    speed: 6,
    size: 3,
    wind: {speed: 1},
    opacity: .1,
  }

  //the parameters for snow
  var snow = {
    speed: 1,
    size: 1,
    wind: {speed: 1},
    opacity: .8,
  }

  //array of our elements
  var elements = [
    {name:'snow', obj:snow},
    {name:'rain', obj:rain}
  ];

  //wind object
  var wind = {
    speed:1,
    direction:'right'
  }
  $('#wind-faster').on('click', function(){
    console.log('the wind direction is ', wind.direction);
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
    console.log('the wind direction is ', wind.direction);
    if(wind.direction==='right'){
      wind.direction='left';
      console.log('changed wind direction to ', wind.direction);
    } else if (wind.direction==='left') {
      wind.direction='right';
    }
  });


  var particleName='rain';
  //creates function factory to create click handlers to switch between elements
  function maker(target){
    $('#'+target.name).on('click', function(){
        //console.log('snow');
        if(target.name!==particleName){
          particleName = target.name;
          for (var key in particle){
            //console.log('they key is ', target.obj[key])
            //console.log('the key is ', snow[key]);
            particle[key] = target.obj[key];
            particles = [];
            precipitates();
          }
        }
    });
  }

  //create a button for every element
  for (var i=0; i<elements.length; i++){
    maker(elements[i]);
  }

  function addParticle(){
    var x = Math.floor(Math.random() * cW)+1;
    var y = Math.floor(Math.random() * cH)+1;
    var size = Math.floor(Math.random() * 5)/particle.size+1;;
    particles.push({'x':x,'y':y,'size':size});
  }

  function precipitates(){
    var snowLimit = 1000;
    while(particles.length<snowLimit){
      addParticle();
    }
    //draw the particles
    for (var i = 0; i < particles.length; i++ ){
      ctx.fillStyle = 'rgba(255,255,255,'+ particle.opacity+')';
      ctx.beginPath();
      ctx.arc(particles[i].x+=wind.speed, particles[i].y+=particles[i].size*particle.speed, particles[i].size, 0, Math.PI*2, false);
      ctx.fill();
      //if the flake exits in the x or y position reset the flake's position for edge wrapping.
      if(particles[i].x > cW|| particles[i].y >cH){
        //reset the particles y position;
        yMoves = Math.floor(particles[i].y/(particles[i].size*particle.speed))+1;
        particles[i].x = particles[i].x-yMoves*wind.speed;
        particles[i].y=0;

      }
    }
  }

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
  });
  //create a button to resume the animation
  $('#resume').on('click', function(){
    if(paused){
      paused = false;
      for (var i=0; i<elements.length; i++){
        maker(elements[i]);
      }
      animateInterval = setInterval(animate, 30);
    }
  });
}
window.addEventListener('load', function(event) {
  createCanvas();
});