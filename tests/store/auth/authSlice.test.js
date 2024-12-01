import { authSlice, checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFictures";

describe('Pruebas en el authSlice', () => { 
    
    test('debe de regresar el estado inicial y llmarse "auth', () => { 
       
        const state = authSlice.reducer( initialState, {});
        
        expect( authSlice.name).toBe('auth');      
        expect( state ).toEqual( initialState);
        
     }) 

     test('debe de realizar la autenticaión', () => { 

        const state = authSlice.reducer( initialState, login( demoUser ));
        expect( state ).toEqual( {
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        }) ;

      })

      test('debe de realizar el logout', () => { 

        const state = authSlice.reducer( notAuthenticatedState, logout());
        expect( state ).toEqual( {
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        }) ;

      })

      test('debe de realizar el logout y mostrar un mensaje de error', () => { 
        
        const errorMessage = 'Credenciales no son correctas'

        const state = authSlice.reducer( notAuthenticatedState, logout({ errorMessage }));
        expect( state ).toEqual( {
            status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        }) ;

      })


      test('debe de cambiar el estado a checking', () => { 
        
        const errorMessage = 'Credenciales no son correctas'

        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        expect( state.status ).toEqual( 'checking') ;

      })

})