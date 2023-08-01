import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IUseIsCurrentUserProps {
    userId?: string;
}

/**
 * Get a user from the database and various meta data associated
 *
 * @param userId The user you want to fetch
 * @returns {boolean} - isCurrentUser
 * @returns {boolean} - validUser
 * @returns {any} - user
 */
export default function useGetUser({ userId }: IUseIsCurrentUserProps) {
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true); //Whether the user requested is the current logged in user
    const [validUser, setValidUser] = useState<boolean>(true); //Whether the user requested is a valid user
    const [user, setUser] = useState<any>({}); //User info requested
    const currentUser = useSelector((state: any) => state.user); //Current logged in user

    const getUser = () => {

    }

    useEffect(() => {
        if(!user){
            setValidUser(false)
        }else{
            if (userId === currentUser?.uid || userId === 'current-user') {
                //if it is the current user we don't call the DB, we just use the user slice
                //TODO: how to integrate RTK QUERY AND LEAVE THE SLICE
                setIsCurrentUser(true);
                setUser(currentUser.user)
                console.log(currentUser)
            } else {
                //getUser
                getUser();
                setUser(currentUser)
                setIsCurrentUser(false);
            }
        }
    }, [userId]);

    return { getUser, isCurrentUser, validUser, user };
}
