import React from 'react';
import App, { Container } from 'next/app';

export default class Troup extends App {
    render() {
        const { Component } = this.props;
        return (
            <div>
                <Component />
            </div>
        );
    }
}
