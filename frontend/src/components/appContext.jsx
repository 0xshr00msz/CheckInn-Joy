import { createContext, useContext, useState, useEffect, Children } from "react";

const context = createContext([])

const userContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null);

    const fetchCurrentUser = async () => {
        let response = await fetch()
        response = await response.json()
        setCurrentUser(response)
    }

    return (
        <context value = {{ currentUser, fetchCurrentUser }}>
            {children}
        </context>
    )
}

export {context, userContextProvider}
export const useCurrentUser = () => React.useContext(context)