import React from 'react';
import App, { Container } from 'next/app';

export default class Troup extends App {
    render(): JSX.Element {
        const { Component } = this.props;
        return (
            <Container>
                <Component />
            </Container>
        );
    }
}
