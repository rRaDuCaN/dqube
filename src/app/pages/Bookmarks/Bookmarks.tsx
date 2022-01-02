import './Bookmarks.scss'
import { useBookmarkedNews } from '../../redux'
import { Card, Fallback, Pagination } from '../../common'
import { usePagination } from '../../hooks'

export function Bookmarks() {
    const bookmarkedNews = useBookmarkedNews()
    const {
        onNextClick,
        onPrevClick,
        from,
        to,
        disableNextBtn,
        disablePrevBtn,
    } = usePagination(bookmarkedNews.length, 8)

    if (bookmarkedNews.length === 0) {
        return <Fallback message="You don't have any bookmarks set yet" />
    }

    return (
        <div className="bookmarks-wrapper">
            <ul className="bookmarks">
                {bookmarkedNews.slice(from, to).map((item) => (
                    <li key={item?.id}>
                        <Card {...item} />
                    </li>
                ))}
            </ul>
            {bookmarkedNews.length > 8 && (
                <Pagination
                    {...{
                        onNextClick,
                        onPrevClick,
                        from,
                        to,
                        disableNextBtn,
                        disablePrevBtn,
                        items: bookmarkedNews.length,
                    }}
                />
            )}
        </div>
    )
}
