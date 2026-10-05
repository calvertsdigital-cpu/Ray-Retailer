import { ReactNode, Component, ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  routeName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for tea-coffee routes
 * Catches and displays errors gracefully without crashing the app
 */
export class TeaCoffeeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[TeaCoffeeErrorBoundary] Error in ${this.props.routeName || 'tea-coffee'}:`,
      error,
      errorInfo
    );
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-white">
            <div className="container-rhl py-24">
              <div className="mx-auto max-w-md text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-amber-600 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-600 mb-6">
                  We encountered an error loading the page. Please try again.
                </p>
                <button
                  onClick={this.handleReset}
                  className="inline-block rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 transition-colors"
                >
                  Try Again
                </button>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
                    <p className="text-xs font-mono text-gray-700">
                      {this.state.error.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
