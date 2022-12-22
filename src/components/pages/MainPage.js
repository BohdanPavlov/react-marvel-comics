import React, {useState} from 'react';

import decoration from '../../resources/img/vision.png';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import RandomChar from '../randomChar/RandomChar';

const MainPage = () => {
    const [selectedCharId, setSelectedCharId] = useState(null)

    const onSelectChar = (id) => {
        setSelectedCharId(id)
    }

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onSelectChar={onSelectChar}/>
                <ErrorBoundary>
                    <CharInfo charId={selectedCharId}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
};

export default MainPage;
