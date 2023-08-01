import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetUserByIdQuery } from 'src/services/restApi/pokemon';

interface IUseIsCurrentUserProps {
    userId?: string;
    lazy?: boolean
}

/**
 * Get a user from the database and various meta data associated
 *
 * @param {string} userId The user you want to fetch
 * @param {boolean} lazy Whether you want the hook to run on mount. Use the getUser exported method to call
 * @returns {boolean} - isCurrentUser
 * @returns {boolean} - validUser
 * @returns {IUser} - user
 */
export default function useGetUser({ userId, lazy = false }: IUseIsCurrentUserProps) {
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true); //Whether the user requested is the current logged in user
    const [validUser, setValidUser] = useState<boolean>(true); //Whether the user requested is a valid user
    const [user, setUser] = useState<any>({}); //User info requested
    const currentUser = useSelector((state: any) => state.user); //Current logged in user
    const [trigger, result] = useLazyGetUserByIdQuery()

    const getUser = () => {
        trigger({userId: userId ?? ''});
    }

    // useEffect(() => {
        
    // }, [result]);

    useEffect(() => {
        if(!lazy){
            if(!user){
                setValidUser(false)
            }else{
                if (userId === currentUser?.uid || userId === 'current-user') {
                    //if it is the current user we don't call the DB, we just use the user slice
                    //TODO: how to integrate RTK QUERY AND LEAVE THE SLICE
                    setIsCurrentUser(true);
                    setUser(currentUser.user)
                } else {
                    //getUser
                    getUser
                    setUser(currentUser)
                    setIsCurrentUser(false);
                }
            }
        }
    }, [userId, lazy]);

    return { getUser, isCurrentUser, validUser, user };
}
