import React, { useEffect, useRef, useState } from "react";
import { BallMovement } from "./BallMovement";
import data from "../../data";
import WallCollision from "./util/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import PlayerStats from "./PlayerStats";
import GameOver from "./GameOver";
import AllBroken from "./util/AllBroke";

let bricks = [];
let { ballObj, paddleProps, brickObj, player } = data;
export default function Board() {
  const [lives, setLives] = useState(5);
  const [canv, setCanv] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setCanv(canvas);
      paddleProps.y = canvas.height - 30;

      // Assign Bricks
      let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PlayerStats(ctx, player, canvas);
      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      // Handle Ball Movement
      BallMovement(ctx, ballObj);

      // Ball and Wall Collision
      WallCollision(ballObj, canvas, player, paddleProps, setLives);

      AllBroken(bricks, player, canvas, ballObj);

      // Brick Collision
      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          // console.log(brickCollision);
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
          player.score += 10;
        }
      }
      Paddle(ctx, canvas, paddleProps);

      // Paddle + Ball Collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  useEffect(() => {
    if (lives === 0) {
      ballObj.dx = 0;
      ballObj.dy = 0;

      return;
    }
  }, [lives]);

  return (
    <div>
      {lives <= 0 && (
        <GameOver canvas={canv} setLives={setLives} bricks={bricks} />
      )}

      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={(event) =>
          (paddleProps.x = event.clientX - paddleProps.width / 2 - 10)
        }
        height="500"
        width={window.innerWidth - 20}
      />
    </div>
  );
}
