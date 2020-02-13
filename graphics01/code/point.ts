import * as PIXI from 'pixi.js';

export class Point {

    public x: number;
    public y: number;

    private color: number;
    private graphics: PIXI.Graphics;

    /**
     * 
     * @param X: number 
     * @param Y: number 
     * @param color: hexidecimal
     */
    constructor(X: number, Y: number, color: number) {

        this.x = X;
        this.y = Y;

        this.color = color;
        this.graphics = new PIXI.Graphics();
    }

    /**
     * Return the point
     */
    public getPoint(): PIXI.Graphics {

        this.graphics.beginFill(this.color);
            this.graphics.drawCircle(this.x, this.y, 2);
        this.graphics.endFill();

        return this.graphics;
    }
}