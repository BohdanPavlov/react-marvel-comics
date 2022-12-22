import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComic = () => {
    const [comic, setComic] = useState({})
    const {loading, error, getComic, clearError} = useMarvelService()
    const {id} = useParams()

    useEffect(() => {
        loadComic(id)
    }, [id])

    const loadComic = (id) => {
        clearError()
        getComic(id)
            .then(onComicLoaded)
    }

    const onComicLoaded = (newComic) => {
        setComic(newComic)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View comic={comic}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language : {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/react-marvel-comics/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
