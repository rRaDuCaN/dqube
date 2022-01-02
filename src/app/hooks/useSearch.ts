import { useEffect, useState } from 'react'
import { useDispatch, addFilteredNews, useNewsForSearch } from '../redux'
import { Index } from 'flexsearch'

export function useSearch() {
    const state = useNewsForSearch()
    // NOTE: Could be Worker instead of Index
    const [index, setIndex] = useState(
        // NOTE: Didn't want to go forward on setup
        new Index({ tokenize: 'full', optimize: true, preset: 'match' })
    )
    const dispatch = useDispatch()

    useEffect(() => {
        Object.keys(state).forEach((item: string) => {
            setIndex(index.add(state[item].id, state[item].headline))
        })
    }, [state, index])

    const handleSearchQuery = (event: any) => {
        dispatch(
            addFilteredNews({
                indexes: index.search(event.target.value, {
                    suggest: true,
                }),
            })
        )
    }

    return {
        handleSearchQuery,
    }
}
