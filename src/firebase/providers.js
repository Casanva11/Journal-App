import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    updateProfile 
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
  try {

    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    // console.log({credentials})
    const {displayName, email, photoURL, uid} = result.user;
    
    return {
        ok: true,
        // User info
        displayName, email, photoURL, uid
    }    

  } catch (error) {     
     const errorCode = error.code;
     const errorMessage = error.message;
     const email = error.customData.email;
     const credential = GoogleAuthProvider.credentialFromError(error);
    return {
        ok: false      
    } 
  }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {       
    
        const resp =  await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        // console.log(resp);
        //TODO: actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            displayName, email, photoURL, uid
        }   

    } catch (error) {
        return {        
             ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) => {    

    try {
        
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {displayName, photoURL, uid} = result.user;
        
        return {
            ok: true,
            displayName, photoURL, uid
        }    
    
      } catch (error) {       
        return {
            ok: false, errorMessage: error.message
        }
    } 
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}

