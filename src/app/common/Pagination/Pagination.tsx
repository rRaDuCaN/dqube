import './Pagination.scss'

export interface PaginationProps {
    onPrevClick: () => void
    onNextClick: () => void
    disableNextBtn: boolean
    disablePrevBtn: boolean
    to: number
    from: number
    items: number
}

export function Pagination({
    onNextClick,
    onPrevClick,
    disableNextBtn,
    disablePrevBtn,
    to,
    from,
    items,
}: PaginationProps) {
    return (
        <div className="pagination-wrapper">
            <div className="items-amount">
                {`${from}-${to} out of ${items}`}
            </div>
            <div className="pagination-btns">
                <button onClick={onPrevClick} disabled={disablePrevBtn}>
                    PREVIOUS
                </button>
                <button onClick={onNextClick} disabled={disableNextBtn}>
                    NEXT
                </button>
            </div>
        </div>
    )
}
