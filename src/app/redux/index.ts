import {
    useSelector as useselector,
    useDispatch as usedispatch,
} from 'react-redux'
import { InfoEntity } from 'src/types'
import { store } from './setup.store'
import { newsSlice, fetchNewsActionCreator } from './slices'

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

type TSelected =
    | RootState
    | {
          [key: string]: InfoEntity
      }
    | InfoEntity[]
    | InfoEntity
    | string
    | number

export function useSelector(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
    return useselector(selector, equalityFn)
}

export function useDispatch() {
    return usedispatch<AppDispatch>()
}

export { store, fetchNewsActionCreator }
export const addBookmark = newsSlice.actions.addBookmark
export const addFilteredNews = newsSlice.actions.addFilteredNews
export const addLatestResearch = newsSlice.actions.addLatestResearch
export const deleteBookmark = newsSlice.actions.deleteBookmark

export function useBookmarkedNews() {
    const bookmarkedNews = useSelector(({ searchBuffer }) =>
        Object.values(searchBuffer).reduce((acc, curr: InfoEntity) => {
            if (curr.inBookmarks) {
                acc = [...acc, curr]
            }
            return acc
        }, [] as InfoEntity[])
    )

    return bookmarkedNews as InfoEntity[]
}

export function useNews() {
    return useSelector(({ searchBuffer }) =>
        Object.values(searchBuffer)
    ) as InfoEntity[]
}

export function useNewsForSearch() {
    return useSelector(({ news }) => news) as {
        [key: string]: InfoEntity
    }
}

export function useLatestResearch() {
    return useSelector(({ latestResearch }) => latestResearch) as InfoEntity
}
