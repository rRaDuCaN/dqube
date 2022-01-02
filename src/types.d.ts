export declare interface InfoEntity {
    category: string
    datetime: number
    headline: string
    id: number
    image: string
    related: string
    source: string
    summary: string
    url: string
    inBookmarks?: boolean
}

export declare interface MediaQueryContextValue {
    addQuery: (query: string) => void
    matches: { [key: string]: boolean }
}
