import React from 'react';

// Catches render-time errors anywhere below it in the tree and shows a
// friendly recovery screen instead of a blank white page. This is the
// single most important safeguard against the "blank page after deploy"
// problem — even if a page component throws, the rest of the shell (and
// this fallback) still renders.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('EduTrade render error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <h2>Something went wrong</h2>
            <p>This part of the page hit an unexpected error. The rest of EduTrade is fine — try going back home.</p>
            <button className="btn btn-solid" onClick={this.handleReset}>Back to Home</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
