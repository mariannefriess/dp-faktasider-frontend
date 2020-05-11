import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ErrorInfo } from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import SlideDown from './SlideDown';

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    // TODO logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const stackTrace = this.state.errorInfo?.componentStack;
      const errormsg = this.state.error?.message;
      return (
        <div>
          <AlertStripeFeil>
            Det skjedde en feil.
            {(stackTrace || errormsg) && (
              <SlideDown title="Stack trace">
                <Tekstomrade>{errormsg}</Tekstomrade>
                <Tekstomrade>{stackTrace}</Tekstomrade>
              </SlideDown>
            )}
          </AlertStripeFeil>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
