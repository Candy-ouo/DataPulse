import { Component } from "react";
import logger from "@/logger/Logger";
export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { logger.error("ErrorBoundary", error.message, { componentStack: info.componentStack }); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-8">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-lg font-bold text-red-400">组件出错了</h2>
          <p className="text-sm text-white/40 max-w-md text-center">{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })} className="px-4 py-1.5 bg-[#00ffaa]/10 border border-[#00ffaa]/30 rounded-lg text-[#00ffaa] text-sm hover:bg-[#00ffaa]/20">重试</button>
        </div>
      );
    }
    return this.props.children;
  }
}
