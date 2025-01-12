import {React , useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage"; // Adjust path as per your project structure
import AuthPage from "./components/Login"; // Adjust path as per your project structure
import DashBoard from "./components/dashBoard"; 
import PageNotFound from "./components/pageNotFound";
import {GoogleOAuthProvider} from "@react-oauth/google"
import RefreshHandler from './RefreshHandler';

const App = () => {

    const GoogleAuthWrapper = ()=>{
      return(
        <GoogleOAuthProvider clientId="887155656525-3613njakpnq2lpnqkj6r65u7ccnkr3qo.apps.googleusercontent.com">
          <AuthPage></AuthPage>
        </GoogleOAuthProvider>
      )
    }

  const [isAuthenticated,setisAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to='/' />
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#081229]">
      <RefreshHandler setisAuthenticated={setisAuthenticated}/>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/dashboard" element={<PrivateRoute element={<DashBoard/>}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
