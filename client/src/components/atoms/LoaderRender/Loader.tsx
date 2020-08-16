import React, { FC } from 'react';
import './Loader.css';

const Loader: FC = () => {
    return (
        <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
    )
}

export default Loader;