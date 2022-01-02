import './Fallback.scss'

interface FallbackProps {
    message?: string
    asLoader?: boolean
}

export function Fallback({ message, asLoader }: FallbackProps) {
    return (
        <div className="fallback">
            {asLoader && (
                <div className="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            )}
            {message && <h2>{message}</h2>}
            {asLoader && message && 'Default message'}
        </div>
    )
}
