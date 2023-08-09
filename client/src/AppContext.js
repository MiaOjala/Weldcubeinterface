import { createContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [id, setId] = useState("")
    return (
        <AppContext.Provider value={
            {
                id: id,
                setId: setId
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;