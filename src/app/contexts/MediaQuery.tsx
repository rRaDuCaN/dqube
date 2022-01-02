import { useState, useEffect, createContext, useMemo, ReactChild } from 'react'
import { MediaQueryContextValue } from 'src/types'

interface MediaQueryOutletProps {
    children: ReactChild
}

const defaultValue = {} as MediaQueryContextValue

export const MediaQueryContext = createContext(defaultValue)

export const MediaQueryOutlet = ({ children }: MediaQueryOutletProps) => {
    const [queryMatch, setQueryMatch] = useState<{ [key: string]: boolean }>({})
    const [queries, setQueries] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const mediaQueryLists = {} as any
        let isAttached = false
        const keys = Object.keys(queries)

        const handleQueryListener = () => {
            const updatedMatches = keys.reduce(
                (acc: any, media) => ({
                    ...acc,
                    [media]: !!(
                        mediaQueryLists[media] && mediaQueryLists[media].matches
                    ),
                }),
                {}
            )
            setQueryMatch(updatedMatches)
        }

        if (window && window.matchMedia) {
            const matches = keys.reduce((acc, media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media] = window.matchMedia(queries[media])

                    return {
                        ...acc,
                        [media]: mediaQueryLists[media].matches,
                    }
                } else {
                    return {
                        ...acc,
                        [media]: false,
                    }
                }
            }, {})
            setQueryMatch(matches)
            isAttached = true

            keys.forEach((media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media].addListener(handleQueryListener)
                }
            })
        }

        return () => {
            if (isAttached) {
                keys.forEach((media) => {
                    if (typeof queries[media] === 'string') {
                        mediaQueryLists[media].removeListener(
                            handleQueryListener
                        )
                    }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries])

    const addQuery = (query: string) =>
        setQueries({
            ...queries,
            [query]: query,
        })

    const memoized: MediaQueryContextValue = useMemo(
        () => ({
            addQuery,
            matches: queryMatch,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [queryMatch]
    )

    return (
        <MediaQueryContext.Provider value={memoized}>
            {children}
        </MediaQueryContext.Provider>
    )
}
