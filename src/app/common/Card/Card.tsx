import {
    addBookmark,
    addLatestResearch,
    deleteBookmark,
    useDispatch,
} from '../../redux'
import { InfoEntity } from 'src/types'
import './Card.scss'

type CardProps = Partial<InfoEntity> & {
    isLatestResearch?: boolean
}

function formatTimeStamp(date: number) {
    return new Date(date).toLocaleDateString('en-UK', {
        month: 'short',
        day: 'numeric',
    })
}

export function Card({
    id,
    image,
    summary,
    inBookmarks,
    related,
    headline,
    datetime,
    url,
    isLatestResearch,
}: CardProps) {
    const dispatch = useDispatch()
    const toggleBookmark = (id: number) => () =>
        inBookmarks
            ? dispatch(deleteBookmark({ id }))
            : dispatch(addBookmark({ id }))
    const setLatestResearch = () =>
        dispatch(addLatestResearch({ id: id as number }))

    return (
        <div className="card-wrapper">
            {isLatestResearch ? null : (
                <a
                    onClick={setLatestResearch}
                    className="overlayed-link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div />
                </a>
            )}
            <div
                className="card-bg"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="card-overlay-wrapper">
                <div className="card-overlay">
                    <div className="labels-container">
                        <span className="weekly-brief">
                            <span className="caption-m">{related}</span>
                        </span>
                        {isLatestResearch && (
                            <span className="latest-research caption-xs">
                                LATEST RESEARCH
                            </span>
                        )}
                    </div>
                    <h4>{headline}</h4>
                    <h6>{summary}</h6>
                    <div className="button-container">
                        <div className="read-research">
                            {isLatestResearch && (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="right-arrow icon">
                                        <svg viewBox="0 0 96 96">
                                            <path d="M12,52h62.344L52.888,73.456c-1.562,1.562-1.562,4.095-0.001,5.656c1.562,1.562,4.096,1.562,5.658,0l28.283-28.284l0,0  c0.186-0.186,0.352-0.391,0.498-0.609c0.067-0.101,0.114-0.21,0.172-0.315c0.066-0.124,0.142-0.242,0.195-0.373  c0.057-0.135,0.089-0.275,0.129-0.415c0.033-0.111,0.076-0.217,0.099-0.331C87.973,48.525,88,48.263,88,48l0,0  c0-0.003-0.001-0.006-0.001-0.009c-0.001-0.259-0.027-0.519-0.078-0.774c-0.024-0.12-0.069-0.231-0.104-0.349  c-0.039-0.133-0.069-0.268-0.123-0.397c-0.058-0.139-0.136-0.265-0.208-0.396c-0.054-0.098-0.097-0.198-0.159-0.292  c-0.146-0.221-0.314-0.427-0.501-0.614L58.544,16.888c-1.562-1.562-4.095-1.562-5.657-0.001c-1.562,1.562-1.562,4.095,0,5.658  L74.343,44L12,44c-2.209,0-4,1.791-4,4C8,50.209,9.791,52,12,52z" />
                                        </svg>
                                    </span>
                                    <span className="caption-l">
                                        Read the research
                                    </span>
                                </a>
                            )}
                            <span className="caption-l date">
                                {formatTimeStamp(datetime as number)}
                            </span>
                        </div>
                        <button
                            onClick={toggleBookmark(id as number)}
                            className="bookmark-btn"
                        >
                            <span className="icon bookmark">
                                {inBookmarks ? (
                                    <svg viewBox="0 0 30 30">
                                        <path d="M23,27l-8-7l-8,7V5c0-1.105,0.895-2,2-2h12c1.105,0,2,0.895,2,2V27z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 512 512">
                                        <path d="M393,450a14.92,14.92,0,0,1-7.46-2L257,374.29,128.46,448A15,15,0,0,1,106,435V63a15,15,0,0,1,15-15H393a15,15,0,0,1,15,15V435a15,15,0,0,1-15,15ZM257,342a14.92,14.92,0,0,1,7.46,2L378,409.1V78H136V409.1L249.54,344A14.92,14.92,0,0,1,257,342Z" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
