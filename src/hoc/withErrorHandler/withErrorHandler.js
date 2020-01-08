import React, {Component} from 'react';

import Modal from '../../components/ui/Modal/Modal';
import Aux from '../Auxiliary';

/**
 * Render modal if error occurs
 * @param WrappedComponent
 * @param axios
 * @returns {{new<P, S>(props: Readonly<P>): {errorConfirmedHandler: function(): void, state: {error: null}, componentDidMount: {(): void, (): void}, render: {(): *, (): React.ReactNode}, shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): (any | null), componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, readonly props: Readonly<{children?: React.ReactNode}> & Readonly<P>, context: any, refs: {[p: string]: React.ReactInstance}}, new<P, S>(props: P, context?: any): {errorConfirmedHandler: function(): void, state: {error: null}, componentDidMount: {(): void, (): void}, render: {(): *, (): React.ReactNode}, shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): (any | null), componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, readonly props: Readonly<{children?: React.ReactNode}> & Readonly<P>, context: any, refs: {[p: string]: React.ReactInstance}}, prototype: {errorConfirmedHandler: function(): void, state: {error: null}, componentDidMount: {(): void, (): void}, render: {(): *, (): React.ReactNode}, shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean, componentWillUnmount?(): void, componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void, getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): (any | null), componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void, componentWillMount?(): void, UNSAFE_componentWillMount?(): void, componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void, componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void, setState<K extends keyof S>(state: (((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | Pick<S, K> | S | null), callback?: () => void): void, forceUpdate(callBack?: () => void): void, readonly props: Readonly<{children?: React.ReactNode}> & Readonly<P>, context: any, refs: {[p: string]: React.ReactInstance}}}}
 */
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.reqInterceptor = axios.interceptors
                .request
                .use(req => {
                    this.setState({
                        error: null
                    });
                    return req
                });
            this.resInterceptor = axios.interceptors
                .response
                .use(res => res,
                    error => {
                        this.setState({error})
                    });
        };

        state = {
            error: null
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    };
};

export default withErrorHandler;