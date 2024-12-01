import { fireEvent, render, screen } from "@testing-library/react"
import { Provider, useDispatch } from "react-redux"

import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../src/store/auth/authSlice"
import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from '../../fixtures/authFictures'
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks"


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassowrd = jest.fn();


jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,    
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassowrd({ email, password});
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('recat-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage/>', () => { 
    
    test('debe de mostrar el componente correctamente  ', () => { 
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        screen.debug( screen.getAllByTestId('Login').length ).toBeGreaterThanOrEqual(1); 
     })


     test('boton de google debe llamar el startGgoogleSignIn', () => { 
        
        console.log(first)

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn')
        // console.log(googleBtn);
        fireEvent.click( googleBtn );
        // screen.debug( ); 
        expect(mockStartGoogleSignIn).toHaveBeenCalled();
        
     })

     test('submit debe de llamar startLoginWithEmailPassword', () => { 
        
        const email = 'carlos@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', {name: 'Correo'} );
        fireEvent.change( emailField, { target: { name:'email', value: email}});
        
        const passwordField = screen.getByTestId('password')
        fireEvent.change( passwordField, { target: { name:'email', value: email}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm);

        expect( mockStartLoginWithEmailPassowrd ).toHaveBeenCalledWith({
            email:email,
            password:password
        })


    })
})
