import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';

const CharList = ({onSelectChar}) => {
    const [characters, setCharacters] = useState([])
    const [newCharactersLoading, setNewCharactersLoading] = useState(false)
    const [offset, setOffset] = useState(1531)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService()

    useEffect(() => {
        getCharacters(offset, true)
    }, [])

    const getCharacters = (offset, initial) => {
        initial ? setNewCharactersLoading(false) : setNewCharactersLoading(true)

        getAllCharacters(offset)
            .then(onCharactersLoaded)
    }

    const onCharactersLoaded = (newCharacters) => {
        let ended = false
        if (newCharacters.length < 9) {
            ended = true
        }

        setCharacters(characters => [...characters, ...newCharacters])
        setNewCharactersLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (i) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
    }

    const onSelectedChar = (id, index) => {
        onSelectChar(id)
        focusOnItem(index)
    }

    const renderItems = (characters) => {
        const items = characters.map((char, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (char.thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li
                    ref={(el) => itemRefs.current[i] = el}
                    className="char__item"
                    key={char.id}
                    onClick={() => onSelectedChar(char.id, i)}
                >
                    <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(characters);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newCharactersLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                onClick={() => getCharacters(offset)}
                disabled={newCharactersLoading}
                style={{display: charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectChar: PropTypes.func.isRequired
}

export default CharList;
