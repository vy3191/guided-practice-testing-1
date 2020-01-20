import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { exportAllDeclaration } from '@babel/types';

afterEach(rtl.cleanup);

test('it renders the app without breaking', () => {
    const wrapper = rtl.render(<App />);
    const element = wrapper.getByText('The Dog Website');
    expect(element).toBeVisible();
});

test('it renders count input', () => {
    const wrapper = rtl.render(<App />);
    const element = wrapper.getByPlaceholderText(/image count/i);
    expect(element).toHaveValue(1);
})