export default function ResetBall(ballObj, paddleProps) {
  ballObj.x = paddleProps.x;
  ballObj.y = paddleProps.y - 50;
  ballObj.dx = 6 * (Math.random() * 2 - 1);
  ballObj.dy = -6;
}
