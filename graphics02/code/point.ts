import * as PIXI from 'pixi.js';

export class Point {

    public x: number;
    public y: number;

    /**
     * Set the color of the point
     */
    public color: number;
    private graphics: PIXI.Graphics;

    /**
     * 
     * @param X: number 
     * @param Y: number 
     * @param color: hexidecimal
     */
    constructor(X: number, Y: number) {

        this.x = X;
        this.y = Y;

        this.graphics = new PIXI.Graphics();
    }

    /**
     * Return the point
     */
    public draw(app: PIXI.Application): void {

        this.graphics.beginFill(this.color);
            this.graphics.drawCircle(this.x, this.y, 1);
        this.graphics.endFill();

        // Add the graphics to the scene
        app.stage.addChild(this.graphics);
    }
}