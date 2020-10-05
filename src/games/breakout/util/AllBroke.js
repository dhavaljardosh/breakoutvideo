import data from "../../../data";
import ResetBall from "./ResetBall";

export default function AllBroken(bricks, player, canvas, ballObj) {
  let total = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].broke === true) {
      total++;
    }
  }
  if (total === bricks.length) {
    let { brickObj, paddleProps } = data;
    player.level++;
    brickObj.y = 50;
    ResetBall(ballObj, paddleProps);
  }
}
