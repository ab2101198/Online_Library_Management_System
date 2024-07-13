import { useState, useEffect, createContext, useContext } from "react"

import { NotificationManager } from "react-notifications"
import 'react-notifications/lib/notifications.css';
import { BackendApi } from "../client/backend-api"

const UserContext = createContext({
    user: null,
    loginUser: () => {},
    logoutUser: () => {},
    isAdmin: false
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {

        const token = localStorage.getItem('authToken');
        if(token){
        BackendApi.user.getProfile().then(({ user, error }) => {
            if (error) {
                console.log(error)
            } else {
                setUser(user)
            }
            // setLoading(false);
        }).catch(err => {
            console.error(err);
            // setLoading(false);
        });
    }
    }, [])

    const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            setUser(user)
            localStorage.setItem('authToken', user.token); // Store the token in local storage
        }
    }

    const logoutUser = async () => {
        setUser(null)
        await BackendApi.user.logout()
        localStorage.removeItem('authToken');
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }