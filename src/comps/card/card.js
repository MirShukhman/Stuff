import './card.css'
import { useState } from 'react'
import { BsCheckCircleFill } from "react-icons/bs";

const Card = (props) =>{
    const item = props.item
    const [inputData, setInputData] = useState('');
    const [taken, setTaken] = useState(false)

    const handleChange = (e) => {
      setInputData(e.target.value);
    };

    const submitRequest = async (e) =>{
    e.preventDefault();
      try {
        const response = await fetch(`https://d294-2a06-c701-440d-db00-b9b1-b5fd-bee7-134.ngrok-free.app/claim_item/${item.id}`,
          {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
              },
              body: JSON.stringify({ name: inputData })
            }
        );
        const data = await response.json();
        if (data.message) {
          console.log(data.message);
          setTaken(true)
        }
      } catch (error) {
        console.error('Error submitting:', error);
    }}

    return(
        <div className="card">
            {taken && <div className='istaken'><BsCheckCircleFill id='checkmark'/>נלקח!</div>}
            {item.image_location && (
                <img className='item-image' src={`data:image/jpeg;base64,${item.image_location}`} alt="Item" />
                                    )}
            <div className='item' id='item-name'>{item.item}</div>
            <div className='item'>{item.descript && item.descript}</div>
            <div className='item'>מחיר: {item.price && <span>ש"ח {item.price} </span>}{!item.price && <span>חינם!</span>}</div>
            <div className='claim'>
                <p>אני רוצה:</p>
                <input 
                placeholder='כתבו שם'
                type="text" 
                value={inputData} 
                onChange={handleChange} 
                />
                <button onClick={submitRequest}>שמור</button>
            </div>
        </div>
    )
}

export default Card