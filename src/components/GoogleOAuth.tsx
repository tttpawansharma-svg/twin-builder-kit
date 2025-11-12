// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface GoogleOAuthProps {
//   type: 'signup' | 'login';
// }

// export const GoogleOAuth: React.FC<GoogleOAuthProps> = ({ type }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { googleAuth } = useAuth();
//   const { toast } = useToast();

//   const handleGoogleSignIn = async () => {
//     setIsLoading(true);
    
//     try {
//       // Check if Google API is loaded
//       if (!window.google) {
//         // Fallback to redirect
//         window.location.href = 'https://api.digitaltwin.techtrekkers.ai/api/auth/google';
//         return;
//       }

//       // Initialize Google Auth2
//       window.google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: handleCallback,
//         context: type,
//         ux_mode: 'popup',
//       });
      
//       // Trigger Google One Tap
//       window.google.accounts.id.prompt((notification: any) => {
//         if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
//           // Fallback to redirect
//           window.location.href = 'https://api.digitaltwin.techtrekkers.ai/api/auth/google';
//         }
//       });
//     } catch (error) {
//       console.error('Google auth error:', error);
//       // Fallback to redirect
//       window.location.href = 'https://api.digitaltwin.techtrekkers.ai/api/auth/google';
//     }
//   };

//   const handleCallback = async (response: any) => {
//     try {
//       const idToken = response.credential;
      
//       // Decode the JWT token to get user info
//       const payload = JSON.parse(atob(idToken.split('.')[1]));
      
//       const googleData = {
//         googleId: payload.sub,
//         name: payload.name,
//         email: payload.email,
//         imageUrl: payload.picture,
//       };

//       await googleAuth(googleData);
//     } catch (error: any) {
//       toast({
//         title: 'Google authentication failed',
//         description: error.message,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       type="button"
//       variant="outline"
//       onClick={handleGoogleSignIn}
//       disabled={isLoading}
//       className="w-full h-12 rounded-2xl border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white transition-all duration-300"
//     >
//       {isLoading ? (
//         <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//       ) : (
//         <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
//           <path
//             fill="currentColor"
//             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//           />
//           <path
//             fill="currentColor"
//             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//           />
//           <path
//             fill="currentColor"
//             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//           />
//         </svg>
//       )}
//       {type === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
//     </Button>
//   );
// };


import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from '@/axios.config';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleOAuthProps {
  type: 'signup' | 'login';
}

export const GoogleOAuth: React.FC<GoogleOAuthProps> = ({ type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleAuth } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Check if Google API is loaded
      if (!window.google) {
        // Fallback to redirect
        window.location.href = `${API_BASE_URL}/auth/google`;
        return;
      }

      // Initialize Google Auth2
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id-here',
        callback: handleCallback,
        context: type,
        ux_mode: 'popup',
      });
      
      // Trigger Google One Tap
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to redirect
          window.location.href = `${API_BASE_URL}/auth/google`;
        }
      });
    } catch (error) {
      console.error('Google auth error:', error);
      // Fallback to redirect
      window.location.href = `${API_BASE_URL}/auth/google`;
    }
  };

  const handleCallback = async (response: any) => {
    try {
      const idToken = response.credential;
      
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(idToken.split('.')[1]));
      
      const googleData = {
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        imageUrl: payload.picture,
      };

      await googleAuth(googleData);
    } catch (error: any) {
      toast({
        title: 'Google authentication failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full h-12 rounded-2xl border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white transition-all duration-300"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      {type === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
    </Button>
  );
};