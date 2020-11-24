import React from 'react';
import Sketch from "react-p5";
import {
    DisplayMultiArray,
    DisplayArray,
    Button
} from "./common";
import "../style.css";

/**
 * Main Component
 *
 * @property int WIDTH
 * @property int HEIGHT
 *
 * @property string TOP
 * @property string CENTER
 * @property string BOTTOM
 * @property string LEFT
 * @property string RIGHT
 *
 * @property int[] u
 * @property int[][] a
 *
 * @property int inputIndex
 *
 * @returns {JSX.Element}
 */
class Main extends React.Component
{
    constructor() {
        super();

        this.state = {
            WIDTH: 600,
            HEIGHT: 900,

            TOP: "start",
            CENTER: "center",
            BOTTOM: "end",
            LEFT: "left",
            RIGHT: "right",

            u: [1,2,3,4],
            a: [[3,1,3,4], [3, -2, 4, -5], [2, 1, 0, 1]],

            inputIndex: 0
        };

        this.cells = this.state.a.map(row => ({
            c: 0,
            ain: null,
            aout: null,
            uin: null,
            uout: null
        }));
    }

    /**
     * Step
     */
    step = () => {
        let cells = this.cells;
        let inputIndex = this.state.inputIndex;
        let newA = this.state.a;
        let newU = this.state.u;

        // First propagate the input
        cells.map((item, index) => {
            cells[index].ain = newA[index][inputIndex] ?? 0;
            cells[index].uin = index < cells.length - 1 ? cells[index + 1].uout : inputIndex < newU.length ? newU[inputIndex] : 0;
        });

        // c = c + (ain * uin)
        // ain - a input
        // uin - u input

        // u - jos in sus
        // a - dreapta in stanga

        // Execute the algorithm and update the register and the out
        cells.map((item, index) => {
            cells[index].c += cells[index].ain * cells[index].uin;
            cells[index].aout = cells[index].ain;
            cells[index].uout = cells[index].uin;
        });

        inputIndex++;

        this.cells = cells;
        this.setState({
            a: newA,
            u: newU,
            inputIndex: inputIndex
        })
    }

    /**
     * Setup
     *
     * @param p5
     * @param canvasParentRef
     */
    setup = (p5, canvasParentRef) => {
        //Canvas of size WIDTHxHEIGHT
        p5.createCanvas(this.state.WIDTH, this.state.HEIGHT).parent(canvasParentRef);
    };

    /**
     * Draw
     *
     * @param p5
     */
    draw = (p5) => {
        p5.clear();
        this.cells.forEach((cell, index) => {
            const left = this.state.WIDTH / 2 - 50, top = 50 + 160 * index;
            p5.fill(255);
            p5.rect(left, top, 100, 100)
            p5.fill(0);
            p5.textAlign(this.state.CENTER, this.state.CENTER)
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
                p5.textAlign(this.state.RIGHT, this.state.BOTTOM);
                p5.text(cell.aout, left - 5, top + 50);
            }
            if (cell.ain !== null) {
                p5.textAlign(this.state.LEFT, this.state.BOTTOM);
                p5.text(cell.ain, left + 105, top + 50);
            }
            if (cell.uout !== null) {
                p5.textAlign(this.state.RIGHT, this.state.BOTTOM);
                p5.text(cell.uout, left + 45, top - 5);
            }
            if (cell.uin !== null) {
                p5.textAlign(this.state.RIGHT, this.state.TOP);
                p5.text(cell.uin, left + 45, top + 105);
            }

            p5.textAlign(this.state.LEFT, this.state.CENTER);

            for (let i = this.state.inputIndex; i < this.state.a[index].length; i++)
                p5.text(this.state.a[index][i] ?? '.', left + 200 + 25 * (i - this.state.inputIndex), top + 50);
        });

        p5.textAlign(this.state.CENTER, this.state.TOP);
        for (let i = this.state.inputIndex; i < this.state.u.length; i++)
            p5.text(this.state.u[i], this.state.WIDTH / 2, 100 + 160 * this.cells.length + 25 * (i - this.state.inputIndex));
    };



    componentDidMount() {

        let arr = this.state.a;
        // Add delays in the matrix a
        arr.map((rows, rowIdx) =>
            rows.slice(0, arr.length - rowIdx - 1).map((item, colIdx) => {
                rows.unshift(null);
            }));

        this.setState({
            a: arr
        });
    }

    render()
    {
        return(
            <div className="App">
                <h3 className="text-center mt-2">
                    Matrix Vector Multiplication
                </h3>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <Sketch setup={this.setup} draw={this.draw} className="App" />
                        </div>
                        <div className="col-4">
                            <div className="mt-4 text-center">
                                <Button
                                    onClick={this.step}
                                    nameClass="info"
                                    text="Click to advance"
                                />
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    A =
                                </div>
                                <div className="col-8 bl-black br-black">
                                    <DisplayMultiArray
                                        array={this.state.a}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    u =
                                </div>
                                <div className="col-2 bl-black br-black text-center">
                                    <DisplayArray
                                        array={this.state.u}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;