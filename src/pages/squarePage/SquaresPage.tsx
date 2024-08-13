import { useEffect } from 'react';
import { getSquaresData, getTargetPercentageBasedOnData } from '../../services/SquareService';
import { useState } from 'react';
import { SquareObj, SquareObjCommonInfo, SquareObjTarget } from '../../interfaces/SquareInterface';
import Square from '../../components/square/Square';
import './SquarePage.css';
import TargetAndSelectedData from '../../components/targetAndSelectedData/TargetAndSelectedData';
import Button from 'react-bootstrap/Button';


type actionType = "add" | "remove";
interface actions {action: actionType, id: number}

function SquaresPage() {

    const [data, setData] = useState<SquareObjCommonInfo[]>([]);
    const [targetSelected, setTargetSelected] = useState<SquareObjTarget | null>(null);
    const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [actionsStorage, setActionsStorage] = useState<actions[]>([]);


    useEffect(() => {
        // once the component is mounted
        getSquaresData()
            .then((res: any) => res.json())
            .then((newData: SquareObjCommonInfo[]) => {
                
                /* Set a random Target */
                const randomTarget = newData[Math.floor(Math.random() * newData.length)];
                const targetPercentageAllOptionsAndTargetData: SquareObjTarget = getTargetPercentageBasedOnData(newData, randomTarget);
                
                setData(newData);
                setTargetSelected(targetPercentageAllOptionsAndTargetData);
                setIsLoading(false);
            })
            .catch((rejected: any) => {
                console.log(rejected);
            });
    }, []);

    const toggleSquareSelected = (squareSelectedId: number) => {
        const copyList = [...selectedSquares];
        if (selectedSquares.includes(squareSelectedId)) {
            const squareToRemove = selectedSquares.map(e => e).indexOf(squareSelectedId);
            copyList.splice(squareToRemove, 1);
            setSelectedSquares(copyList);
            //Action adding
            setActionsStorage([...actionsStorage, {action: "add", id:squareSelectedId }]);
        } else {
            setSelectedSquares([...copyList, squareSelectedId]);
            //Remove adding
            setActionsStorage([...actionsStorage, {action: "remove", id:squareSelectedId }]);
        }
    }

    const undoRedoAction = () => {
        if(actionsStorage.length === 0){
            return;
        }
        const actionToDo = actionsStorage[actionsStorage.length-1];
        
        if(actionToDo.action === "add"){
            setSelectedSquares([...selectedSquares, actionToDo.id])
        } else {
            const newArr = selectedSquares.slice(0, -1);
            setSelectedSquares(newArr);
        }
        setActionsStorage(actionsStorage.slice(0, -1));
    }

    return (
        <div>
            <Button variant="outline-primary" onClick={()=> undoRedoAction()}>Call Action undo/redo</Button>

            {!isLoading && targetSelected
                ? <TargetAndSelectedData data={data}
                    targetSelected={targetSelected}
                    selectedSquares={data.filter((_, index) => selectedSquares.includes(index))}></TargetAndSelectedData>
                : 'No Target Selected'
            }

            <div className='row__container'>
                {data.map((squareItem: SquareObjCommonInfo, index) => {
                    return <Square key={`squareObj_${index}`}
                        {...squareItem}
                        id={index}
                        isSelected={selectedSquares.includes(index)}
                        onClick={toggleSquareSelected}></Square>
                })}
            </div>
        </div>
    );
}

export default SquaresPage;
