import React from "react";
import { useRouter } from "next/router";
import { GlobleContext } from "globleContext";
import { useEffect } from "react";

const ProtectedRoute = (WrappedComponent)=>{
    return(props)=>{
        const router = useRouter()
        const [flag,setFlag] = React.useState<any>(false);
        const {isLoggedIn, setIsLoggedIn} = React.useContext <any>(GlobleContext)
            
    }
}
export default ProtectedRoute

