//this file defines are particles. Can be extended to add more particles

 //a specific particle
  var particle = {
    name: 'rain',
    speed: 6,
    size: 3,
    wind: {speed:1},
    opacity: .1,
  };

  //the parameters for rain
  var rain = {
    name: 'rain',
    speed: 6,
    size: 3,
    wind: {speed: 1},
    opacity: .1,
  }

  //the parameters for snow
  var snow = {
    name: 'snow',
    speed: 1,
    size: 1,
    wind: {speed: 1},
    opacity: .8,
  }

  //array of our elements
  var elements = [snow, rain];