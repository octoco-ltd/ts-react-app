import { defineAbility } from '@casl/ability';

/**
 * Define user abilities based on their user type.
 * @param userType - The type of the user, e.g., 'admin' or 'user'.
 * @returns {Ability} - An instance of the defined abilities for the user.
 */
export default function defineAbilityFor(userType: string) {
    return defineAbility((can, cannot) => {
        if (userType === 'admin') {
            // Admin abilities
            can('read', 'users');    // Read users of the platform
            can('update', 'users');  // Update role of user
            can('create', 'users');  // Create new user
            can('delete', 'users');  // Delete users
        } else {
            // Non-admin abilities
            cannot('read', 'users');    // Deny reading users of the platform
            cannot('update', 'users');  // Deny updating role of user
            cannot('create', 'users');  // Deny creating new user
            cannot('delete', 'users');  // Deny deleting users
        }
        //Add other roles here
    });
}
