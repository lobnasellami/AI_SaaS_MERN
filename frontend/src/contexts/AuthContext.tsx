// here we will create a customm hook for creating a user context
//
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";
  type User ={
    name :string;
    email:string;
}
type UserAuth={
    isLoggedIn: boolean;
    user :User | null;
    login :(email:string, password:string) =>Promise<void>;
    signup :(name: string, email:string, password:string) =>Promise<void>;
    logout:()=> Promise<void> //delete cookies 
}

const AuthContext= createContext<UserAuth | null> (null);
// provider is a tag that surrends the compoennt where we want to use that context 
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // fetch if the user's cookies are valid then skip login
      async function checkStatus() {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      }
      checkStatus();
    }, []);
          const login =async (email:string, password:string)=>{
          const data = await loginUser(email,password)
          if (data){
            setUser({name :data.name,email:data.email})
            setIsLoggedIn(true);
          }
        }
        const signup =async (name: string, email:string, password:string)=>{}
        const logout =async ()=>{}
     const value ={
        user,
        isLoggedIn,
        login,
        logout,
        signup};
        return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>


   


}

export const  useAuth=()=>useContext(AuthContext);