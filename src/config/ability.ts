import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(userType: string) {
    return defineAbility((can, cannot) => {
        if (userType === 'admin') {
            can('read', 'users'); //read users of platform
            can('update', 'users'); //update role of user
            can('create', 'users'); //create new user
            can('delete', 'users'); //delete users
        } else {
            //Deny all if we can't find user type
            cannot('read', 'users'); //read users of platform
            cannot('update', 'users'); //update role of user
            cannot('create', 'users'); //create new user
            cannot('delete', 'users'); //delete users
        }
    });
}
