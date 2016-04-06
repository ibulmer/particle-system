Welcome to the Particle Simulator. This particle system simulates weather. Currently it has rain and snow along with wind. Particles can be added in the particles.js file to extend the simulation.

To start
  From the root directory of the project:
  1. npm install
  2. node server/server.js
  3. open browser and navigate to localhost:3000
Deploying on heroku:
  1. Heroku create
  2. git push heroku master
  3. heroku open

The app is deployed at https://particle-system-asymmetrik.herokuapp.com/

The main app logic can be found in main.js.
Particles are added to a particles array with random x and y positions up until a max of 1000, but this number can easily be changed. Particles are given a random size. Speed is a function of the size to create a layered appearance. Particles wrap around when they exit the screen. Particles exiting the canvas in the x direction re-enter the plane in the x direction and particles exiting in the y direction re-enter in the y direction.

The particles are created in the particles.js file.
Currently there is snow and rain.
More particles can easily be added in this file. Simply create the particles characteristics and then add the particle to the elements array.
The logic in main.js will automatically take care of movement, creating buttons to select the new particle, populating the simulation with the particle, and having weather events interact with the new particles.

Weather events such as wind are found in wind.js. Additional weather events can be added in this file. Event handlers should be added in the document.ready function to ensure that they are correctly attached to the dom elements.

