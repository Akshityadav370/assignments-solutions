import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { CHAT } from '@repo/common/types';

type Shape =
  | {
      type: 'rect';
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: 'circle';
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  ws: WebSocket
) {
  const ctx = canvas.getContext('2d');

  const existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === CHAT) {
      existingShapes.push(JSON.parse(data.message));
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  canvas.addEventListener('mousedown', (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener('mouseup', (e) => {
    clicked = false;
    console.log(e.clientX);
    console.log(e.clientY);
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: 'rect',
      x: startX,
      y: startY,
      width,
      height,
    };
    existingShapes.push(shape);
    ws.send(
      JSON.stringify({
        type: CHAT,
        message: JSON.stringify(shape),
        roomId: Number(roomId),
      })
    );
  });

  canvas.addEventListener('mousemove', (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = 'rgba(255, 255, 255)';
      ctx.strokeRect(startX, startY, width, height);
    }
  });

  return function cleanup() {
    // Remove event listeners
    canvas.removeEventListener('mousedown', () => {});
    canvas.removeEventListener('mouseup', () => {});
    canvas.removeEventListener('mousemove', () => {});

    ws.close();
  };
}

export function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === 'rect') {
      ctx.strokeStyle = 'rgba(255, 255, 255)';
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${BACKEND_URL}/room/${roomId}`);

  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });

  return shapes;
}
