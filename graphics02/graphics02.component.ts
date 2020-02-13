import { Component, OnInit } from '@angular/core';

import * as PIXI from 'pixi.js';

import { Point } from './code/point';
import { Line } from './code/line';
import { GameAction } from '../../../../controls/gameAction';
import { MouseManager } from '../../../../controls/mouseManager';

@Component({
  selector: 'app-graphics02',
  templateUrl: './graphics02.component.html',
  styleUrls: ['./graphics02.component.scss']
})
export class Graphics02Component implements OnInit {

  private app: PIXI.Application;
  private canvas: HTMLCanvasElement;

  private mouseClick: GameAction;
  private mouseManager: MouseManager;

  private click: number = 0;

  private point1: Point;
  private point2: Point;
  private color: number;

  constructor() { }

  ngOnInit() {

    // Get the canvas DOM element
    this.canvas = document.getElementById("example02") as HTMLCanvasElement;
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

      // Represent the first point for the line
      // Set the initial color of the line also
      if(this.click === 0) {

        let x: number = this.mouseManager.getMouseX();
        let y: number = this.mouseManager.getMouseY();

        // Create a random RGB color
        let R = Math.random();  // Red
        let G = Math.random();  // Green
        let B = Math.random();  // Blue

        // Create a random color
        this.color = PIXI.utils.rgb2hex([R, G, B]);

        // Create a new point for the scene
        this.point1 = new Point(x, y);
        this.point1.color = this.color;
        this.point1.draw(this.app);

        this.click += 1;
      }

      // Second point for the line
      else if(this.click === 1) {

        let x: number = this.mouseManager.getMouseX();
        let y: number = this.mouseManager.getMouseY();

        // Create a new point for the scene
        this.point2 = new Point(x, y);
        this.point2.color = this.color;
        this.point2.draw(this.app);

        let line: Line = new Line(this.point1, this.point2);
        line.color = this.color;

        // Draw the line
        line.draw(this.app);

        // Reset the click count
        this.click = 0;
      }
    }
  }
}
