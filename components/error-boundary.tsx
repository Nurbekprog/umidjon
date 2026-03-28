"use client";

import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

interface SectionProps {
  children: ReactNode;
  sectionName?: string;
}

export class SectionErrorBoundary extends React.Component<SectionProps, State> {
  constructor(props: SectionProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(`[${this.props.sectionName ?? "Section"}] Error:`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-8 my-8 rounded-xl border border-red-500/20 p-12 text-center">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">
            {this.props.sectionName ?? "Section"} failed to render.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background px-6">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Please refresh the page or
              contact support.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
