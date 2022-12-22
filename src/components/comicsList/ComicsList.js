import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [newComicsLoading, setNewComicsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => {
        getComics(offset, true)
    }, [])

    const getComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)

        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false
        if (newComics.length < 8) {
            ended = true
        }

        setComics(comics => [...comics, ...newComics])
        setNewComicsLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(ended)
    }

    const renderItems = (comics) => {
        const items = comics.map((comic, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/react-marvel-comics/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = renderItems(comics)

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const loadingStyle = loading ? {display: 'flex', justifyContent: 'center', flexDirection: 'column'} : null

    return (
        <div className='comics__list' style={loadingStyle}>
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => getComics(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
