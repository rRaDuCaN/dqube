import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { BrowserRouter } from 'react-router-dom'

function NavbarTest() {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
}

describe('testing Navbar component', () => {
    test('renders <Navbar />', () => {
        render(<NavbarTest />)

        expect(screen.getByText(/News/i)).toBeInTheDocument()
        expect(screen.getByText(/Bookmarks/i)).toBeInTheDocument()
    })
})
