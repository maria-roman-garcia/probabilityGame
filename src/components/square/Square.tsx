import './square.css';
import { SquareObj } from "../../interfaces/SquareInterface";


function Square({isSelected, id, color, size, dot, onClick }: SquareObj) {
    return (
        <div className='grid' onClick={()=> onClick(id)}>
            <div className={`square__container ${isSelected ? 'is_selected': ''}`}>
                <div className={`square__item color__${color} size__${size} ${isSelected ? '' : 'is_not_selected'}`}>
                    {dot && <div className='square__dot'></div>}
                </div>
            </div>
        </div>
    );
}

export default Square;