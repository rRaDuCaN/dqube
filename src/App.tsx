import './App.scss'
import { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Fallback, Navbar, Search } from './app/common'
import { fetchNewsActionCreator, useDispatch, useSelector } from './app/redux'
import routes from './app/routes'

function App() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.status)

    useEffect(() => {
        dispatch(fetchNewsActionCreator())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (status !== 'succeeded') {
        return <Fallback asLoader />
    }

    return (
        <>
            <header>
                <Navbar />
                <Search />
            </header>
            <main>
                <Suspense fallback={<Fallback asLoader />}>
                    <Routes>
                        {routes.map((item, idx) => (
                            <Route key={idx} {...item} />
                        ))}
                    </Routes>
                </Suspense>
            </main>
        </>
    )
}

export default App
