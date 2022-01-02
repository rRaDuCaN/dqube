import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { Provider as StoreOutlet } from 'react-redux'
import { MediaQueryOutlet } from './app/contexts'
import { store } from './app/redux'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <StoreOutlet store={store}>
                <MediaQueryOutlet>
                    <App />
                </MediaQueryOutlet>
            </StoreOutlet>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
