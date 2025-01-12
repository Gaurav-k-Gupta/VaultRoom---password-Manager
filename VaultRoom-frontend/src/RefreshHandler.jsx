import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleEroor } from "./components/toaster";

function RefreshHandler({setisAuthenticated}){
    const location = useLocation();
    const navigate = useNavigate();


    const verifyUser = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const res = await response.json();
            console.log(res);
            if(response.status == 403){
                handleEroor(err);
                setisAuthenticated(false);
                console.log('session timeout');
                localStorage.removeItem('token');
                localStorage.removeItem('loggedInUserName');
                localStorage.removeItem('loggedInUserEmail');
            }
            else {
                setisAuthenticated(true);
                if(location.pathname === "/" || location.pathname === "/login"){
                    navigate('/dashboard',{replace : false});
                }
            }
            
        } catch (err) {
            handleEroor(err);
            console.log('session timeout');
            localStorage.removeItem('token');
            localStorage.removeItem('loggedInUserName');
            localStorage.removeItem('loggedInUserEmail');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setisAuthenticated(true);
            if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup"){
                navigate('/dashboard',{replace : false});
            }
        }
    },[location , navigate , setisAuthenticated])

    return(
        null
    )

}

export default RefreshHandler;