var updateCounter = 0; // Opens and closes pacMouths in update()
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled
    let velocity = setToRandom(25);
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0][0];
    newimg.width = 100;

    // set position
    newimg.style.left = `${position.x}px`;
    newimg.style.top = `${position.y}px`;
    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    updateCounter += 1;
    let directionTracker;
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
        // animate Men
        if (item.velocity.x < 0) {
            directionTracker = 1;
        } else directionTracker = 0;
        item.newimg.src = pacArray[directionTracker][updateCounter % 2];
    })
    setTimeout(update, 50);
}

function checkCollisions(item) {
    // detect collision with all walls and make pacman bounce
    const xMax = window.innerWidth;
    const yMax = window.innerHeight;
    // newimg.width accounts for pacMan's width, so they bounce without leaving the screen
    if (item.position.x + item.newimg.width >= xMax || item.position.x <= 0) {
        item.velocity.x = -item.velocity.x;
    }
    if (item.position.y + item.newimg.width >= yMax || item.position.y <= 0) {
        item.velocity.y = -item.velocity.y;
    }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}