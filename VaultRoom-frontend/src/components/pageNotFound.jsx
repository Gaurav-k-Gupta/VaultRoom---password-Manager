import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function pageNotFound (){
    return(
        <>
            <h1 className="flex justify-center text-[#F2022E]" style={{fontWeight:"700" , fontSize:"24px" , paddingTop:"30vh" , marginBottom:"10px" }}>Error : 404 Page Not Found</h1>
            <Link
                              type="submit"
                              className="p-4 mx-auto bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105 mx-[46vw]" 
                              to='/login'
                            >
                              <FaSignInAlt className="inline-block mr-2" />
                              Login
                            </Link>
        </>
    )
}

export default pageNotFound;