import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import { store } from '../../redux'

const mockedData = {
    category: 'company',
    datetime: 1615827300,
    headline: 'Tesla: Too Much Reliance On Hype',
    id: 64666133,
    image: 'https://static.seekingalpha.com/uploads/2021/3/15/1017993-16158175265548587.png',
    related: 'AAPL',
    source: 'SeekingAlpha',
    summary:
        'Elon Musk and Zach Kirkhorn get new titles. FSD news tries to hide Fremont factory fire.',
    url: 'https://finnhub.io/api/news?id=a2eafb1f7156d6051347e25751a22c7d999886dd59ca1ee3afd4e9e7b807c90e',
}

function CardTest(
    { isLatestResearch }: { isLatestResearch?: boolean } = {
        isLatestResearch: false,
    }
) {
    return (
        <Provider store={store}>
            <Card {...{ ...mockedData, isLatestResearch }} />
        </Provider>
    )
}

describe('testing Card component', () => {
    test('renders <Card />', () => {
        render(<CardTest />)

        expect(screen.getByText(/AAPL/i)).toBeInTheDocument()
    })

    test('expect <Card /> component to be latest research', () => {
        render(<CardTest isLatestResearch />)

        expect(screen.getByText('LATEST RESEARCH')).toBeInTheDocument()
        expect(screen.getByText('Read the research')).toBeInTheDocument()
    })
})
