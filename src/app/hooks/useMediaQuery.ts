import { useContext, useEffect } from 'react'
import { MediaQueryContextValue } from 'src/types'
import { MediaQueryContext } from '../contexts'

export function useMediaQuery(query: string) {
    const context: MediaQueryContextValue = useContext(MediaQueryContext)

    Object.keys(context.matches).forEach((media) => {
        if (query === media) {
            // reuse the value
            return context.matches[query]
        }
    })

    useEffect(() => {
        context.addQuery(query)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return context.matches[query]
}
