const ball = document.querySelector('.ball');
const bat = document.querySelector('.bat');
const gameContainer = document.querySelector('.game-container');

let dx = 2;
let dy = 2;

gameContainer.addEventListener('mousemove', (e) => {
	if (e.clientX < 50 || e.clientX > 300 - 50) {
  	return;
  }
  bat.style.left = (e.clientX - 50) + 'px';
  
	console.log(e.clientX, e.clientY);
})

const containerBounds = {
	left: 0,
  top: 0,
  bottom: 400,
  right: 300,
}

function gameLoop(timestamp) {
	const ballsBound = {
  	left: ball.offsetLeft,
  	right: ball.offsetLeft + ball.clientWidth,
    top: ball.offsetTop,
    bottom: ball.offsetTop + ball.clientWidth,
  };
	const batBound = {
  	left: bat.offsetLeft,
  	right: bat.offsetLeft + bat.clientWidth,
    top: bat.offsetTop,
    bottom: bat.offsetTop + bat.clientWidth,
  };
	const isCollidedHorizantal = ballsBound.right > containerBounds.right || ballsBound.left < containerBounds.left; 
	const isCollidedVertical = ballsBound.bottom > containerBounds.bottom || ballsBound.top < containerBounds.top; 
  // console.log(ballsBound.right, containerBounds.right);
  const isCollidedWithBat = ballsBound.bottom >= batBound.top && ballsBound.left <= batBound.right && ballsBound.right >= batBound.left;
  if (ballsBound.bottom >= containerBounds.bottom) {
  	ball.style.left = (gameContainer.clientWidth / 2) + 'px';
  	ball.style.top = (gameContainer.clientHeight / 2) + 'px';
  }
  if (isCollidedHorizantal) {
  	dx = -dx;
  }
  if (isCollidedVertical) {
  	dy = -dy;
  }
  if (isCollidedWithBat) {
  	dy = -dy;
  }
  ball.style.left = (parseFloat(ball.style.left, 10) || 0) + dx + 'px';
  ball.style.top = (parseFloat(ball.style.top, 10) || 0) + dy + 'px';
  requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);
