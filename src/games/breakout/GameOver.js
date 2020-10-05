import React from "react";
import data from "../../data";
import ResetBall from "./util/ResetBall";
export default function GameOver({ canvas, setLives, bricks }) {
  const restartGame = () => {
    let { ballObj, paddleProps, player, brickObj } = data;
    player.lives = 5;
    setLives(player.lives);
    bricks.length = 0;
    brickObj.y = 50;
    player.score = 0;
    player.level = 1;
    ResetBall(ballObj, paddleProps);
  };
  return (
    <div
      style={{
        position: "absolute",
        height: canvas && canvas.height ? canvas.height : 20,
        width: canvas.width,
        textAlign: "center",
      }}
    >
      <div
        style={{
          marginTop: "50%",
          textAlign: "center",
          color: "white",
          fontWeight: "800",
        }}
      >
        GAME OVER
      </div>
      <div onClick={restartGame}>Restart</div>
    </div>
  );
}
