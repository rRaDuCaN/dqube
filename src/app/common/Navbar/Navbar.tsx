import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav>
            <ul>
                <li>
                    <Link
                        to={'/news'}
                        className={pathname === '/news' ? 'active' : ''}
                    >
                        <span>News</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/bookmarks'}
                        className={pathname === '/bookmarks' ? 'active' : ''}
                    >
                        <span>Bookmarks</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
