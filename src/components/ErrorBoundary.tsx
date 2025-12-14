import React from 'react'

const searilizeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack
  }
  return JSON.stringify(error, null, 2)
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="theme-panel theme-panel--danger">
          <h2 className="font-semibold" style={{ color: 'rgb(var(--color-danger))' }}>
            Something went wrong.
          </h2>
          <pre className="mt-2 text-sm theme-text-secondary whitespace-pre-wrap">{searilizeError(this.state.error)}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
