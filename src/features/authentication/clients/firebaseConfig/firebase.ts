import { initializeApp } from 'firebase/app';

const initFirebase = (deploymentEnv: string) => {
    const firebaseConfig: Record<string, any> = {
        development: {
            apiKey: 'AIzaSyCVkwIxhbg3xutfTxe2j2IjAcs8WjF_dpY',
            authDomain: 'octoco-base.firebaseapp.com',
            projectId: 'octoco-base',
            storageBucket: 'octoco-base.appspot.com',
            messagingSenderId: '904597752995',
            appId: '1:904597752995:web:e57c8f54771b22465bc316'
        },
        staging: {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: ''
        },
        production: {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: ''
        }
    };

    const Firebase = initializeApp(firebaseConfig[deploymentEnv]);
    return Firebase
}

export default initFirebase;
