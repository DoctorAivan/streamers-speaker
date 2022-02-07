import { createContext, useState } from "react";

//  Export Context
export const UserContext = createContext()

//  User 
const UserProvider = (props) => {

    //  User Details data
    const [user, setUser] = useState(false)

    //  Return Constructor
    return (
        <UserContext.Provider value={{ user , setUser }}>
            {props.children}
        </UserContext.Provider>
    )
};

//  Export Provider
export default UserProvider;
