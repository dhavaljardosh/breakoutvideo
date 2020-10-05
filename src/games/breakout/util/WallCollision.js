import ResetBall from "./ResetBall";

export default function WallCollision(
  ballObj,
  canvas,
  player,
  paddleProps,
  setLives
) {
  console.log("y " + ballObj.y);
  if (ballObj.y - ballObj.rad > canvas.height) {
    console.log(ballObj.y - ballObj.rad, canvas.height);
    player.lives--;
    setLives(player.lives);
    ResetBall(ballObj, paddleProps);
  }
  if (ballObj.y - ballObj.rad < 0) {
    ballObj.dy *= -1;
  }

  if (ballObj.x + ballObj.rad > canvas.width || ballObj.x - ballObj.rad < 0) {
    ballObj.dx *= -1;
  }
}
