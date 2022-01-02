import { lazy } from 'react'
import { News } from '../pages'

const Bookmarks = lazy(() => import('../pages/Bookmarks'))

const routes = [
    {
        path: '/',
        element: <News />,
    },
    {
        path: '/news',
        element: <News />,
    },
    {
        path: '/bookmarks',
        element: <Bookmarks />,
    },
]

export default routes
