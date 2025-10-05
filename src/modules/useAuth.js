
import { ref, computed } from 'vue';
import { firebaseApp } from './firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const currentUser = ref(null);
//When the page starts, we want to check if the user is logged in or not; null is the default value

const isLoggedIn = computed(() => !!currentUser.value)
//computed fct keep an eye on the value of currentUser
// the !! convert the value into a boolean; it is an if else statement; could be rewritten as: a ternary operator if else statement

const authError = ref(null);
const loading = ref(false);

//we want to listen to the auth state change; force an update of currentUser when the auth state changes
onAuthStateChanged(auth, (user) => {
    currentUser.value = user
})

const login = async (email, password) => {
    console.log('login attempt: ', email);
    loading.value = true
    authError.value= null
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
    //finally makes sure it runs no matter what
}

const register = async (email, password) => {
    console.log('register attempt: ', email);
    loading.value = true
    authError.value= null
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
    //finally makes sure it runs no matter what
}


const logout = async(routerInstance) => {
    console.log('logout of this email: ', currentUser.value?.email); //optional chaining operator for expecting a null value
    loading.value = true
    authError.value = null

    try {
        await signOut(auth)
        if (routerInstance) {
            routerInstance.push('/')
    }
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
}

export function useAuth() {
    return {
        currentUser,
        isLoggedIn,
        authError,
        loading,
        login,
        logout,
        register
    }
}
