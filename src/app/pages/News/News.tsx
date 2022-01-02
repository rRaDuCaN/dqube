import './News.scss'
import { Card, Pagination } from '../../common'
import { useNews, useLatestResearch } from '../../redux'
import { usePagination, useMediaQuery } from '../../hooks'

export function News() {
    const isMax800 = useMediaQuery('(max-width: 800px)')
    const news = useNews()
    const latestResearch = useLatestResearch()
    const {
        onNextClick,
        onPrevClick,
        from,
        to,
        disableNextBtn,
        disablePrevBtn,
    } = usePagination(news.length, 6)

    return (
        <div className="news">
            <div className="content-wrapper">
                <aside className="aside-card">
                    <Card {...latestResearch} isLatestResearch />
                </aside>
                <section>
                    {isMax800 ? (
                        <div className="main-feed">
                            {news.slice(from, to).map((item) => (
                                <div key={item.id}>
                                    <Card {...item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="main-feed">
                                {news.slice(from, to - 3).map((item) => (
                                    <div key={item.id}>
                                        <Card {...item} />
                                    </div>
                                ))}
                            </div>
                            <div className="main-feed">
                                {news.slice(from + 3, to).map((item) => (
                                    <div key={item.id}>
                                        <Card {...item} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>
            <Pagination
                {...{
                    onPrevClick,
                    onNextClick,
                    disablePrevBtn,
                    disableNextBtn,
                    to,
                    from,
                    items: news.length,
                }}
            />
        </div>
    )
}
