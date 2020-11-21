import React from 'react';
import Sketch from "react-p5";

/**
 * Main Component
 *
 * @property int WIDTH
 * @property int HEIGHT
 * @property string TOP
 * @property string CENTER
 * @property string BOTTOM
 * @property string LEFT
 * @property string RIGHT
 * @property int inputIndex
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Main = () => {
    let WIDTH = 1200;
    let HEIGHT = 900;

    // CENTER | END | LEFT | RIGHT | START
    const TOP = "start"
    const CENTER = "center";
    const BOTTOM = "end";
    const LEFT = "left";
    const RIGHT = "right";
    // "center" | "end" | "left" | "right" | "start";

    const u = [1, 2, 3, 4];
    const a = [[1, 2, 1, 3], [1, -1, 2, -2], [4, 3, 2, 1]];

    // Add delays in the matrix a
    a.forEach((row, index) => {
        // Prepend 0's as delays
        for (let i = 0; i < a.length - index - 1; i++)
            row.unshift(null);
    });

    let inputIndex = 0;

    /**
     * Cells
     *
     * @type {{a: *, pin: null, pout: null, xin: null, xout: null}[]}
     */
    let cells = a.map(row => ({
        c: 0,
        ain: null,
        aout: null,
        uin: null,
        uout: null
    }));

    /**
     * Step
     */
    const step = () => {
        // First propagate the input
        for (let i = 0; i < cells.length; i++) {
            cells[i].ain = a[i][inputIndex] ?? 0;
            cells[i].uin = i < cells.length - 1 ? cells[i + 1].uout : inputIndex < u.length ? u[inputIndex] : 0;
        }


        // Execute the algorithm and update the register and the out
        for (let i = 0; i < cells.length; i++) {
            cells[i].c += cells[i].ain * cells[i].uin;
            cells[i].aout = cells[i].ain;
            cells[i].uout = cells[i].uin;
        }
        inputIndex++;
    }


    /**
     * Setup
     *
     * @param p5
     * @param canvasParentRef
     */
    let setup = (p5, canvasParentRef) => {
        //Canvas of size WIDTHxHEIGHT
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);

        p5.mouseClicked = () => {
            step();
        }
    };

    /**
     * Draw
     *
     * @param p5
     */
    let draw = (p5) => {
        p5.clear();

        cells.forEach((cell, index) => {
            const left = WIDTH / 2 - 50, top = 50 + 160 * index;
            p5.fill(255);
            p5.rect(left, top, 100, 100)
            p5.fill(0);
            p5.textAlign(CENTER, CENTER)
            p5.textSize(32)
            p5.text('P' + (index + 1), left, top + 10, 100, 50);
            p5.textSize(20)
            p5.text(cell.c, left, top + 60, 100, 40);

            //noFill()
            p5.textSize(16);
            p5.line(left - 30, top + 50, left, top + 50);
            p5.line(left + 100, top + 50, left + 130, top + 50);
            p5.line(left + 50, top - 30, left + 50, top);
            p5.line(left + 50, top + 100, left + 50, top + 130);
            if (cell.aout !== null) {
                p5.textAlign(RIGHT, BOTTOM);
                p5.text(cell.aout, left - 5, top + 50);
            }
            if (cell.ain !== null) {
                p5.textAlign(LEFT, BOTTOM);
                p5.text(cell.ain, left + 105, top + 50);
            }
            if (cell.uout !== null) {
                p5.textAlign(RIGHT, BOTTOM);
                p5.text(cell.uout, left + 45, top - 5);
            }
            if (cell.uin !== null) {
                p5.textAlign(RIGHT, TOP);
                p5.text(cell.uin, left + 45, top + 105);
            }

            p5.textAlign(LEFT, CENTER);
            for (let i = inputIndex; i < a[index].length; i++)
                p5.text(a[index][i] ?? '.', left + 200 + 25 * (i - inputIndex), top + 50);
        });

        p5.textAlign(CENTER, TOP);
        for (let i = inputIndex; i < u.length; i++)
            p5.text(u[i], WIDTH / 2, 100 + 160 * cells.length + 25 * (i - inputIndex));

        p5.textAlign(CENTER, BOTTOM)
        p5.textSize(18)
        p5.text('Click to advance', WIDTH / 2, HEIGHT - 10)

    };

    return (
        <div className="App">
            <Sketch setup={setup} draw={draw} className="App" />
        </div>
    );
}

export default Main;