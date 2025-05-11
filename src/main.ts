import './style.css';
import { App } from './app';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <canvas id="canvas" width="1024" height="768"></canvas>
`;

new App(document.querySelector<HTMLCanvasElement>('#canvas')!);
