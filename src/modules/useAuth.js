import { ref, computed } from 'vue';
import { firebaseApp } from './firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useUsers } from './useUsers.js';

const auth = getAuth(firebaseApp);

const currentUser = ref(null);
const isLoggedIn = computed(() => !!currentUser.value)
const authError = ref(null);
const loading = ref(false);

// Initialize user management
const { createUserProfile, getUserProfile, updateLastLogin } = useUsers();

onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    
    if (user) {
        // Check if user profile exists, create if not
        try {
            const existingProfile = await getUserProfile(user.uid);
            if (!existingProfile) {
                console.log('Creating missing user profile');
                await createUserProfile(user);
            } else {
                // Update last login
                await updateLastLogin(user.uid);
            }
        } catch (error) {
            console.error('Error handling user profile on auth state change:', error);
        }
    }
});

const login = async (email, password) => {
    console.log('login attempt: ', email);

    loading.value = true;
    authError.value = null;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update last login time
        await updateLastLogin(user.uid);
        
    } catch (err) {
        authError.value = err.message;
    } finally {
        loading.value = false;
    }
}

const register = async (email, password) => {
    console.log('register attempt: ', email);
    loading.value = true;
    authError.value = null;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user profile in Firestore
        await createUserProfile(user);
        
    } catch (err) {
        authError.value = err.message;
    } finally {
        loading.value = false;
    }
}

const logout = async(routerInstance) => {
    console.log('logout of this email: ', currentUser.value?.email);
    loading.value = true;
    authError.value = null;

    try {
        await signOut(auth);
        if (routerInstance) {
            routerInstance.push('/');
        }
    } catch (err) {
        authError.value = err.message;
    } finally {
        loading.value = false;
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