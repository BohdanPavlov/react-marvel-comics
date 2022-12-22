import {useEffect, useState} from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";

import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        if (!charId) return

        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error) && char ? <View char={char}/> : null

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    function mapComics(comics) {
        const comicsList = comics.map((item, i) => {
            return (
                <li className="char__comics-item" key={i}>
                    {item.name}
                </li>
            )
        })

        if (comicsList.length > 10) {
            return comicsList.slice(0, 10)
        }

        if (comicsList.length === 0) {
            return 'No comics with this character :('
        }

        return comicsList
    }

    const {name, description, thumbnail, homepage, wiki, comics} = char
    const comicsList = mapComics(comics)
    const imgStyle = thumbnail.includes('image_not_available') ? {'objectFit': 'contain'} : null

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}

export default CharInfo;
