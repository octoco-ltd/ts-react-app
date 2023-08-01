const pages = {
    auth: {
        root: 'auth',
        login: {
            name: 'login',
            path: '/auth/login'
        },
        register: {
            name: 'register',
            path: '/auth/register'
        },
    },
    home: {
        name: 'home',
        path: '/home'
    },
    profile: {
        root: 'profile',
        view: {
            name: 'profile',
            path: '/profile/view/:userId'
        },
        edit: {
            name: 'profile',
            path: '/profile/edit/:userId'
        }
    },
    status: {
        root: 'status',
        unverified: {
            name: 'unverified',
            path: '/status/unverified'
        },
        statusComingSoon: {
            name: 'coming-soon',
            path: '/status/coming-soon'
        },
        statusMaintenance: {
            name: 'maintenance',
            path: '/status/maintenance'
        },
        status404: {
            name: '404',
            path: '/status/404'
        },
        status500: {
            name: '500',
            path: '/status/500'
        }
    }
}

export default pages;