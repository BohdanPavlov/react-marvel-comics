import {Link} from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';

const PageNotFound = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: 30}}>404: Page not found!</p>
            <Link
                to='/react-marvel-comics'
                style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: 'green'}}
            >Back to main page</Link>
        </div>
    );
};

export default PageNotFound;
