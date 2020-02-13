import { Component, OnInit } from '@angular/core';

import * as PIXI from 'pixi.js';

import { Point } from './code/point';
import { GameAction } from '../../../../controls/gameAction';
import { MouseManager } from '../../../../controls/mouseManager';

@Component({
  selector: 'app-graphics01',
  templateUrl: './graphics01.component.html',
  styleUrls: ['./graphics01.component.scss']
})
export class Graphics01Component implements OnInit {

  private app: PIXI.Application;
  private canvas: HTMLCanvasElement;

  private mouseClick: GameAction;
  private mouseManager: MouseManager;

  constructor() { }

  ngOnInit() {

    // Get the canvas DOM element
    this.canvas = document.getElementById("example01") as HTMLCanvasElement;
    this.mouseManager = new MouseManager(this.canvas);

    this.mouseClick = new GameAction("LEFT_MOUSE_CLICK", GameAction.DETECT_INITIAL_PRESS_ONLY);
    this.mouseManager.mapToMouse(this.mouseClick, MouseManager.MOUSE_BUTTON_1);

    // Create a renderer
    this.app = new PIXI.Application({

      width: this.canvas.width,
      height: this.canvas.height,
      view: this.canvas,
      backgroundColor: 0x000000,
      clearBeforeRender: true,
      resolution: 1
    });

    this.startRendering();
  }

  /**
   * Start the game loop by adding the 'gameloop' function to
   * Pixi's `ticker` and providing it with a `delta` argument
   */
  private startRendering(): void {

    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  private gameLoop(delta: number): void {

    // The player the left mouse button
    if(this.mouseClick.isPressed()) {

      let x: number = this.mouseManager.getMouseX();
      let y: number = this.mouseManager.getMouseY();

      // Create a random RGB color
      let R = Math.random();  // Red
      let G = Math.random();  // Green
      let B = Math.random();  // Blue

      // Create a random color
      let color: number = PIXI.utils.rgb2hex([R, G, B]);

      // Create a new point for the scene
      let point: Point = new Point(x, y, color);

      // Add point to the scene
      this.app.stage.addChild(point.getPoint());
    }
  }
}
