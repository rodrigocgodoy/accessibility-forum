import React, {
  // useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react';
// import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';

const AuthContext = createContext({});
const FACEBOOK_LOGIN_TYPE = 'facebook';
// const GOOGLE_LOGIN_TYPE = 'google';

export const AuthProvider: React.FC = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [loginType, setLoginType] = useState<null | 'facebook' | 'google'>(
    null,
  );

  // useEffect(() => {
  //   (async () => {
  //     await GoogleSignIn.initAsync({
  //       webClientId:
  //         '291963792116-sni9ik45i213vf9s9mf2ukahcc6qdovc.apps.googleusercontent.com',
  //     });
      
  //   })();
  // }, []);

  //Facebook Login
  const useSignInFacebook = useCallback(async (navigation) => {
    try {
      await Facebook.initializeAsync({
        appId: '1039083046515488',
      });
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setUserInfo({ data });
            setIsSigned(true);
            setLoginType(FACEBOOK_LOGIN_TYPE);
            navigation.navigate('Forum');
          })
          .catch(e => console.log(e))
      } else {
        setUserInfo({});
        setIsSigned(false);
        setLoginType(null);
        alert(`Facebook Login Cancelado`);
      }
    } catch ({ message }) {
      setUserInfo({});
      setIsSigned(false);
      setLoginType(null);
      alert(`Facebook Login Error: ${message}`);
    }
  }, []);

  // const useSignInGoogleSilently = async (navigation: any) => {
  //   const userInfo = await GoogleSignIn.signInSilentlyAsync();
  //   setUserInfo({ userInfo });
  //   setIsSigned(true);
  //   setLoginType(GOOGLE_LOGIN_TYPE);
  //   navigation.navigate('Forum');
  // }

  // //Google Login
  // const useSignInGoogle = useCallback(async (navigation) => {
  //   try {
  //     await GoogleSignIn.initAsync({
  //       webClientId:
  //         '291963792116-sni9ik45i213vf9s9mf2ukahcc6qdovc.apps.googleusercontent.com',
  //     });
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //     if (type === 'success') {
  //       useSignInGoogleSilently(navigation);
  //     }
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // }, []);

  // const useSignOutGoogle = useCallback(async (navigation) => {
  //   try {
  //     await GoogleSignIn.signOutAsync();
  //     setIsSigned(false);
  //     setUserInfo({});
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const useSignOutFacebook = useCallback(async (navigation) => {
    try {
      await Facebook.logOutAsync();
      setIsSigned(false);
      setUserInfo({});
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  }, []);

  const useSignOut = useCallback(
    (navigation) => {
      switch (loginType) {
        case FACEBOOK_LOGIN_TYPE: {
          useSignOutFacebook(navigation);
        }
        // case GOOGLE_LOGIN_TYPE: {
        //   useSignOutGoogle(navigation);
        // }
        default:
          break;
      }
    },
    [loginType],
  );

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        setIsSigned,
        userInfo,
        setUserInfo,
        loginType,
        setLoginType,
        useSignInFacebook,
        // useSignInGoogle,
        useSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

interface IAuthContext {
  isSigned: boolean;
  userInfo: object;
  setUserInfo: Function;
  loginType: string;
  setLoginType: Function;
  useSignInFacebook: Function;
  useSignInGoogle: Function;
  useSignOut: Function;
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  return context as IAuthContext;
};

export default AuthProvider;