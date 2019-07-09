import React, { Component } from 'react';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      error: null,
    };

    // This will be called before the child components are rendered.
    // It should use the constructor instead since componentWillMount will be removed
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        (error) => {
          this.setState({ error });
        },
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;
      const renderSection = error ? (
        <div>An error occurred while contacting the server</div>
      ) : (
        <WrappedComponent {...this.props} />
      );
      return renderSection;
    }
  };

export default withErrorHandler;
