import { useEffect, useState } from 'react';
import type { PercentagesObj, SquareObjCombinations, SquareObjCommonInfo, SquareObjTarget } from '../../interfaces/SquareInterface';
import Square from '../square/Square';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { getSquareAllPossibleCombinationsUsedDataCases, optionsDot, optionsSquareColor, optionsSquareSize } from '../../services/SquareService';
import Accordion from 'react-bootstrap/Accordion';
import './targetAndSelectedData.css';
import Button from 'react-bootstrap/Button';


type TargetAndSelectedDataProps = { data: SquareObjCommonInfo[], targetSelected: SquareObjTarget, selectedSquares: SquareObjCommonInfo[] };
function TargetAndSelectedData({ data, targetSelected, selectedSquares }: TargetAndSelectedDataProps) {

    const [allPossibleCombinations, setAllPossibleCombinations] = useState<SquareObjCombinations[]>([]);
    const [dropDownFilter, setDropDownFilter] = useState<number>(1);
    const dropdownFilterOptions = [
        {
            value: 1,
            label: "Color"
        },
        {
            value: 2,
            label: "Size"
        },
        {
            value: 3,
            label: "Dot"
        },
        {
            value: 4,
            label: "All variants"
        }
    ];
    const [percentageCalc, setPercentageCalc] = useState<PercentagesObj>({ targetPercentage: 0, actualPercentage: 0 });

    useEffect(() => {
        let targetPercentage;
        let actualPercentage;

        if (dropDownFilter === 1) {
            targetPercentage = targetSelected.targetPercentage_color;
            actualPercentage = (selectedSquares.filter(e => e.color === targetSelected.color).length * 100) / selectedSquares.length;
        } else if (dropDownFilter === 2) {
            targetPercentage = targetSelected.targetPercentage_size;
            actualPercentage = (selectedSquares.filter(e => e.size === targetSelected.size).length * 100) / selectedSquares.length;
        } else if (dropDownFilter === 3) {
            targetPercentage = targetSelected.targetPercentage_dot;
            actualPercentage = (selectedSquares.filter(e => e.dot === targetSelected.dot).length * 100) / selectedSquares.length;
        } else if (dropDownFilter === 4) {
            targetPercentage = targetSelected.targetPercentage_all;
            actualPercentage = (selectedSquares.filter(e =>
                e.color === targetSelected.color
                && e.size === targetSelected.size
                && e.dot === targetSelected.dot).length * 100) / selectedSquares.length;
        }

        setPercentageCalc({
            targetPercentage: Number(targetPercentage),
            actualPercentage: Number(actualPercentage || 0)
        })

    }, [dropDownFilter, selectedSquares]);

    useEffect(() => {
        setAllPossibleCombinations(getSquareAllPossibleCombinationsUsedDataCases(data));
    }, [data]);

    const handleSelectChange = (e: any) => {
        setDropDownFilter(Number(e.target.value));
    };

    return (
        <div className='row p-3'>
            <div className='col-12 col-md-4'>
                <div className='card_border'>
                    <h4>Target</h4>
                    <Square {...targetSelected}
                        id={0}
                        isSelected={true}
                        onClick={() => { }}></Square>

                    You have to select squares to fit the Target Percentage based on one of this modes:<br />
                    <b>Color, Size, Dot,</b> or <b>All variants</b><br />
                    You can change the mode filter with the dropdown.<br />

                    This is the <b>target</b>:<br />
                    <div className='card_border mt-2 mb-2'>
                        {dropDownFilter === 1 && <p><b>Color:</b> {targetSelected.color}</p>}
                        {dropDownFilter === 2 && <p><b>Size:</b> {targetSelected.size}</p>}
                        {dropDownFilter === 3 && <p><b>With Dot:</b> {targetSelected.dot ? 'Yes' : 'No'}</p>}
                        {dropDownFilter === 4 && <div>
                            <p><b>Color:</b> {targetSelected.color}</p>
                            <p><b>Size:</b> {targetSelected.size}</p>
                            <p><b>Dot:</b> {targetSelected.dot ? 'yes' : 'no'}</p>
                        </div>}
                    </div>
                </div>

            </div>

            <div className='col-12 col-md-8'>


                <Form.Label>Select type of filter to play:</Form.Label>
                <Form.Select aria-label="Filter By" value={dropDownFilter} onChange={(e) => handleSelectChange(e)} className="mb-3">
                    {dropdownFilterOptions.map((option, index) => {
                        return <option value={option.value} key={index}>{option.label}</option>
                    })}
                </Form.Select>

                <div className={`card_border mt-2 mb-2 ${percentageCalc?.targetPercentage === percentageCalc?.actualPercentage ? 'targetAndPercentage_match' : 'targetAndPercentage_dont_match'}`}>
                    <p><b>Target:</b> {percentageCalc?.targetPercentage.toFixed(1)} %</p>
                    <hr />
                    <p><b>Actual:</b> {percentageCalc?.actualPercentage.toFixed(1)} %</p>
                    <p><b>Difference:</b> {Math.abs((percentageCalc?.targetPercentage - percentageCalc?.actualPercentage)).toFixed(1)} %</p>

                    {percentageCalc?.targetPercentage === percentageCalc?.actualPercentage && <div>
                        <h3>🎉 CONGRATULATIONS!! 🎉</h3>
                        <Button variant="success" onClick={() => { window.location.reload() }}>Play again</Button>
                    </div>}
                </div>

                {(() => {
                    switch (dropDownFilter) {
                        case 1: return <div>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Case</th>
                                        {optionsSquareColor.map((e, index) => { return <th key={index}>{e}</th> })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Selected</td>
                                        {optionsSquareColor.map((color, index) => { return <td key={index}>{selectedSquares.filter(e => e.color === color).length}</td> })}
                                    </tr>
                                    <tr>
                                        <td>Total Squares</td>
                                        {optionsSquareColor.map((color, index) => { return <td key={index}>{data.filter(e => e.color === color).length}</td> })}
                                    </tr>
                                </tbody>
                            </Table>

                            <Accordion className="mb-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Do you need help? check the Solution</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Select color like target: {targetSelected.solution_color.targetCases}</p>
                                        <p>Select color <b>NOT</b> like target: {targetSelected.solution_color.notLikeTargetCases}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        case 2: return <div>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Case</th>
                                        {optionsSquareSize.map((e, index) => { return <th key={index}>{e}</th> })}</tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Selected</td>
                                        {optionsSquareSize.map((size, index) => { return <td key={index}>{selectedSquares.filter(e => e.size === size).length}</td> })}
                                    </tr>
                                    <tr>
                                        <td>Total Squares</td>
                                        {optionsSquareSize.map((size, index) => { return <td key={index}>{data.filter(e => e.size === size).length}</td> })}
                                    </tr>
                                </tbody>
                            </Table>

                            <Accordion className="mb-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Do you need help? check the Solution</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Select size like target: {targetSelected.solution_size.targetCases}</p>
                                        <p>Select size <b>NOT</b> like target: {targetSelected.solution_size.notLikeTargetCases}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        case 3: return <div>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Case</th>
                                        {optionsDot.map((e, index) => { return <th key={index}>{e ? 'With Dot' : 'Whithout Dot'}</th> })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Selected</td>
                                        {optionsDot.map((withDot, index) => { return <td key={index}>{selectedSquares.filter(e => e.dot === withDot).length}</td> })}
                                    </tr>
                                    <tr>
                                        <td>Total Squares</td>
                                        {optionsDot.map((withDot, index) => { return <td key={index}>{data.filter(e => e.dot === withDot).length}</td> })}
                                    </tr>
                                </tbody>
                            </Table>

                            <Accordion className="mb-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Do you need help? check the Solution</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Select dot like target: {targetSelected.solution_dot.targetCases}</p>
                                        <p>Select dot <b>NOT</b> like target: {targetSelected.solution_dot.notLikeTargetCases}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        case 4: return <div>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Case</th>
                                        {allPossibleCombinations.map((comb, index) => {
                                            return <th key={`th_${index}`}>
                                                <div className={`square__item color__${comb.color} size__table_${comb.size}`}>
                                                    {comb.dot && <div className='square__dot'></div>}
                                                </div>
                                            </th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Selected</td>
                                        {allPossibleCombinations.map((comb, index) => {
                                            return <td key={`td_${index}`}>{selectedSquares.filter(e =>
                                                e.size === comb.size
                                                && e.color === comb.color
                                                && e.dot === comb.dot
                                            ).length}</td>
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Total Squares</td>
                                        {allPossibleCombinations.map((comb, index) => {
                                            return <td key={`td_${index}`}>{comb.numberOfUsedCases}</td>
                                        })}
                                    </tr>
                                </tbody>
                            </Table>

                            <Accordion className="mb-3">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Do you need help? check the Solution</Accordion.Header>
                                    <Accordion.Body>
                                        <p>Select squares like target: {targetSelected.solution_all.targetCases}</p>
                                        <p>Select squares <b>NOT</b> like target: {targetSelected.solution_all.notLikeTargetCases}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    }
                })()}
            </div>
        </div>
    );
}

export default TargetAndSelectedData;
