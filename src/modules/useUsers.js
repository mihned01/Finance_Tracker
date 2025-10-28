import { ref } from 'vue';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.js';

export function useUsers() {
  const userProfile = ref(null);
  const isLoadingProfile = ref(false);
  const profileError = ref(null);

  const createUserProfile = async (user) => {
    if (!user) return;

    isLoadingProfile.value = true;
    profileError.value = null;

    try {
      console.log('Creating user profile for:', user.uid);
      
      const userDocRef = doc(db, 'users', user.uid);
      
      const userProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        emailVerified: user.emailVerified || false
      };

      await setDoc(userDocRef, userProfileData);
      userProfile.value = userProfileData;
      
      console.log('User profile created successfully');
      return userProfileData;
    } catch (error) {
      console.error('Error creating user profile:', error);
      profileError.value = error.message;
      throw error;
    } finally {
      isLoadingProfile.value = false;
    }
  };

  const getUserProfile = async (userId) => {
    if (!userId) return null;

    isLoadingProfile.value = true;
    profileError.value = null;

    try {
      console.log('Fetching user profile for:', userId);
      
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userProfile.value = userData;
        console.log('User profile found');
        return userData;
      } else {
        console.log('User profile not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      profileError.value = error.message;
      throw error;
    } finally {
      isLoadingProfile.value = false;
    }
  };

  const updateLastLogin = async (userId) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        lastLogin: serverTimestamp()
      }, { merge: true });
      
      console.log('Last login updated for user:', userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  return {
    userProfile,
    isLoadingProfile,
    profileError,
    createUserProfile,
    getUserProfile,
    updateLastLogin
  };
}