import * as PIXI from 'pixi.js';

import { Point } from './point';

/**
 * Uses Bresenham Line Algorithm to draw a line on screen
 */
export class Line {

    private p1: Point;
    private p2: Point;
    private graphics: PIXI.Graphics; 

    /**
     * Set the color of the line
     */
    public color: number;

    constructor(point1: Point, point2: Point) {

        this.p1 = point1;
        this.p2 = point2;
        this.graphics = new PIXI.Graphics();
    }

    /**
     * Draw the line
     */
    public draw(app: PIXI.Application): void {

        let x1: number = Math.round(this.p1.x);
        let y1: number = Math.round(this.p1.y);

        let x2: number = Math.round(this.p2.x);
        let y2: number = Math.round(this.p2.y);

        // Difference between points
        let dx: number = x2 - x1;
        let dy: number = y2 - y1;
        let stepX: number = 0;
        let stepY: number = 0;

        // Y initialize
        if(dy < 0) {

            dy = -dy;
            stepY = -1;
        }

        else {

            stepY = 1;
        }

        // X initialize
        if(dx < 0) {

            dx = -dx;
            stepX = -1;
        }

        else {

            stepX = 1;
        }

        dy <<= 1;   // dy is now 2 * dy
        dx <<= 1;   // dx is now 2 * dx

        // Draw point
        this.drawPoint(x1, y1, app);

        if(dx > dy) {

            // same as 2 * dy - dx
            let fraction: number = dy - (dx >> 1);

            while(x1 != x2) {

                if(fraction >= 0) {

                    y1 += stepY;
                    fraction -= dx;     // same as fraction -= 2 * dx
                }

                x1 += stepX;
                fraction += dy;

                this.drawPoint(x1, y1, app);
            }
        }

        else {

            let fraction: number = dx - (dy >> 1);

            while(y1 != y2) {

                if(fraction >= 0) {

                    x1 += stepX;
                    fraction -= dy;
                }

                y1 += stepY;
                fraction += dx;

                this.drawPoint(x1, y1, app);
            }
        }
    }

    /**
     * Draw a point on the line
     * 
     * @param x 
     * @param y 
     * @param app 
     */
    private drawPoint(x: number, y: number, app: PIXI.Application): void {

        this.graphics.beginFill(this.color);
            this.graphics.drawCircle(x, y, 1);
        this.graphics.endFill();

        // Add the graphics to the scene
        app.stage.addChild(this.graphics);
    }
}