import { InfoEntity } from 'src/types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export const fetchNewsActionCreator = createAsyncThunk(
    'fetchNews',
    async () => {
        return await fetch(
            'https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-03-01&to=2021-03-15&token=bpjsf67rh5r9328ecgvg'
        ).then((res) => res.json())
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: {} as { [key: string]: InfoEntity },
        searchBuffer: {} as { [key: string]: InfoEntity },
        latestResearch: {} as InfoEntity,
        status: 'initial',
    },
    reducers: {
        addBookmark: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => {
            if (state.latestResearch.id === id) {
                state.latestResearch = {
                    ...state.latestResearch,
                    inBookmarks: true,
                }
            }

            state.news = {
                ...state.news,
                [id]: {
                    ...state.news[id],
                    inBookmarks: true,
                },
            }

            state.searchBuffer = {
                ...state.searchBuffer,
                [id]: {
                    ...state.searchBuffer[id],
                    inBookmarks: true,
                },
            }
        },
        deleteBookmark: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => {
            if (state.latestResearch.id === id) {
                state.latestResearch = {
                    ...state.latestResearch,
                    inBookmarks: false,
                }
            }

            state.news = {
                ...state.news,
                [id]: {
                    ...state.news[id],
                    inBookmarks: false,
                },
            }

            state.searchBuffer = {
                ...state.searchBuffer,
                [id]: {
                    ...state.searchBuffer[id],
                    inBookmarks: false,
                },
            }
        },
        addFilteredNews: (
            state,
            {
                payload: { indexes },
            }: PayloadAction<{
                indexes: (number | string)[]
            }>
        ) => {
            if (indexes.length === 0) {
                // reset to default
                state.searchBuffer = { ...state.news }
            } else {
                state.searchBuffer = indexes.reduce(
                    (acc, curr) => ({
                        ...acc,
                        [curr]: state.news[curr],
                    }),
                    {} as { [key: string]: InfoEntity }
                )
            }
        },
        addLatestResearch: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => {
            state.latestResearch = { ...state.news[id] }
        },
    },
    extraReducers(builder) {
        builder
            .addCase('fetchNews/pending', (state, _) => {
                state.status = 'loading'
            })
            .addCase('fetchNews/fulfilled', (state, action) => {
                state.status = 'succeeded'
                // @ts-ignore
                state.news = action.payload.reduce(
                    (acc: any, curr: InfoEntity) => ({
                        ...acc,
                        [curr.id]: curr,
                    }),
                    {} as { [key: string]: InfoEntity }
                )

                // searchBuffer init
                state.searchBuffer = { ...state.news }
                // latest research fallback
                // @ts-ignore
                state.latestResearch = action.payload[0]
            })
    },
})
