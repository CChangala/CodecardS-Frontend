import React from 'react';
import './Preview.css';

const Preview = ({title,description,details,benefits,onClose})=>{
    return (<div class="preview-overlay">
        <div class="preview-box">
            <button onClick={onClose} class="close-button">
                x
            </button>
            <h2>{title}</h2>
            <p><strong>About The Course</strong></p>
            <p>{details}</p>
            <p><strong>What You will Gain</strong></p>
            <p>{benefits}</p>


        </div>

    </div>
    );
};

export default Preview;