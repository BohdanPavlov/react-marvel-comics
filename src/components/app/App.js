import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";

const PageNotFound = lazy(() => import('../pages/PageNotFound'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                   <Suspense>
                       <Routes>
                           <Route path='/react-marvel-comics/' element={<MainPage />} />
                           <Route path='/react-marvel-comics/comics' element={<ComicsPage />} />
                           <Route path='/react-marvel-comics/comics/:id' element={<SingleComicPage />} />
                           <Route path='*' element={<PageNotFound />} />
                       </Routes>
                   </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;
