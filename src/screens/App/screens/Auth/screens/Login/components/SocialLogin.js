import { useGoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';

const clientId =
    '56403247689-eck69aes93robv2dgfpmpj9i712se7s4.apps.googleusercontent.com';
const FB = window.FB;

const SocialLogin = ({ loading, onGoogleLogin, onFacebookLogin }) => {
    const onSuccess = (res) => {
        /*console.log('Login Success: currentUser:', res.profileObj);
        console.log(res.getAuthResponse().id_token);*/
        onGoogleLogin({ token: res.getAuthResponse().id_token });
        /*alert(
          `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );*/
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        toast.error('Something went wrong');
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: false,
        // accessType: 'offline',
        // responseType: 'code',
        // prompt: 'consent',
    });

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        signIn();
    };

    const handleFacebookLogin = (e) => {
        e.preventDefault();
        FB.login(
            (response) => {
                statusChangeCallback(response);
            },
            {
                scope: 'email',
            }
        );
    };

    const statusChangeCallback = (response) => {
        if (response.status === 'connected') {
            //console.log(response.authResponse.accessToken);
            onFacebookLogin({ token: response.authResponse.accessToken });
            //testAPI();
        } else if (response.status === 'not_authorized') {
            toast.error('You are logged into Facebook but not on Töölö');
            console.log(
                '[FacebookLoginButton] Person is logged into Facebook but not your app'
            );
        } else {
            toast.error('You are not logged into Facebook');
            console.log('[FacebookLoginButton] Person is not logged into Facebook');
        }
    };

    /*const testAPI = () => {
      FB.api('/me?locale=en_US&fields=name,email', (response) => {
        console.log('[FacebookLoginButton] Successful login for: ', response);
      });
    };*/

    return (
        <div className="socialbuttonlogin">
            <a href="/" className="withgmail" onClick={handleGoogleLogin}>
                {loading ? 'Logging in' : 'Login Using Gmail'}
                <img
                    src={require('assets/images/icons/gmail.png').default}
                    alt="gmail"
                />
            </a>
            <a href="/" className="widthfacebook" onClick={handleFacebookLogin}>
                {loading ? 'Logging in' : 'Login Using Facebook'}
                <img
                    src={require('assets/images/icons/facebook.png').default}
                    alt="faceboook"
                />
            </a>
        </div>
    );
};

export default SocialLogin;
