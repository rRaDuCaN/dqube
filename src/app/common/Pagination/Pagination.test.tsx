import React from 'react'
import { render, screen } from '@testing-library/react'
import { Pagination, PaginationProps } from './Pagination'

const mockedData = {
    onPrevClick: jest.fn(),
    onNextClick: jest.fn(),
    disableNextBtn: true,
    disablePrevBtn: false,
    to: 12,
    from: 6,
    items: 12,
}

function PaginationTest() {
    return <Pagination {...mockedData} />
}

describe('testing Pagination component', () => {
    test('renders <Pagination />', () => {
        render(<PaginationTest />)

        const next = screen.getByText(/NEXT/i)
        const prev = screen.getByText(/PREVIOUS/i)

        expect(prev).toBeInTheDocument()
        expect(next).toBeInTheDocument()
    })
})
