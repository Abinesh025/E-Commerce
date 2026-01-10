import React, { createContext, useState } from 'react'

const AppContext = createContext();

export const useAppContext = ({children}) => {

    const [user, setUser] = useState(null);

    const [seller, setSeller] = useState(false);

    const value={user , setUser , seller , setSeller};

    return <AppContext.Provider value={value} >
                {children}
            </AppContext.Provider>
  
}

export const useContext = ()=>{
    return useContext(useAppContext)
}

