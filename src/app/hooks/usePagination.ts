import { useEffect, useState } from 'react'

interface PaginationMeta {
    pages: number
    currPage: number
    disablePrevBtn: boolean
    disableNextBtn: boolean
    from: number
    to: number
}

export function usePagination(numberOfItems: number, itemsToShow: number) {
    const [pagination, setPagination] = useState<PaginationMeta>({
        pages: 0,
        currPage: 0,
        disablePrevBtn: true,
        disableNextBtn: true,
        from: 0,
        to: itemsToShow,
    })

    useEffect(() => {
        if (numberOfItems !== 0) {
            setPagination({
                ...pagination,
                disableNextBtn: false,
                pages: Math.ceil(numberOfItems / itemsToShow),
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberOfItems, itemsToShow])

    const onPrevClick = () => {
        if (pagination.currPage <= 2) {
            setPagination({
                ...pagination,
                disablePrevBtn: true,
                disableNextBtn: false,
                from: 0,
                to: itemsToShow,
            })
        } else {
            setPagination({
                ...pagination,
                disablePrevBtn: false,
                disableNextBtn: false,
                currPage: pagination.currPage - 1,
                from: pagination.from - itemsToShow,
                to: pagination.to - itemsToShow,
            })
        }
    }

    const onNextClick = () => {
        if (pagination.currPage >= pagination.pages - 1) {
            setPagination({
                ...pagination,
                disableNextBtn: true,
                disablePrevBtn: false,
            })
        } else {
            setPagination({
                ...pagination,
                disableNextBtn: false,
                disablePrevBtn: false,
                currPage: pagination.currPage + 1,
                from: pagination.from + itemsToShow,
                to: pagination.to + itemsToShow,
            })
        }
    }

    return {
        onNextClick,
        onPrevClick,
        ...pagination,
    }
}
