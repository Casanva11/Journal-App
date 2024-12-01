import { Password } from "@mui/icons-material";
import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFictures";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock('../../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => { 

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())
    
    test('debe de invocar el checkingCredentials ', async() => { 
                
        await checkingAuthentication()(dispatch)

        expect( dispatch ).toHaveBeenCalledWith({'payload': undefined, 'type':'auth/checkingCredentials'})
    
     }) 

     test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito ', async() => { 
                
        const loginData =  { ok:true, ...demoUser};
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login(loginData));
       
     })

     test('startGoogleSignIn debe de llamar checkingCredentials y login - error ', async() => { 
                
        const loginData =  { ok: false, errorMessage: 'Error en google'};
        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
       
     })

     test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito ', async() => { 
                
        const loginData =  { ok: true, ...demoUser};
        const formData = { email: demoUser.email, password:'123456'}

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login(loginData));
       
     })

     test('startLogout debe de llamar logourFirebase, clearNotes y logout ', async() => { 
        
        await startLogout()(dispatch);        

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith(clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith(logout());
       
     })
     
    

 })