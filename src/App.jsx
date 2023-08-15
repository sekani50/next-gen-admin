import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Scrolltotop from "./components/UI/ScrollToTop";
import { RequireAuth } from "./Utils/RequireAuth";
import {
  Login,
  Landing,
  CreateEvent,
  ShortListed,
  Participants,
  Events,
 
} from "./Pages";

const App = () => {
  return (
    <div className="w-full h-full text-sm sm:text-[15px] poppins text-[#051534]">
      <div>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: "top-center",
            success: {
              style: {
                background: "#222",

                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: {
                background: "red",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <Router>
        <Scrolltotop />

        <Routes>
          {/*    AUTH PAGE */}

      
          <Route exact path="/" element={<Login />} />
          {/*    LANDING PAGE  */}
          
       
   
      
          {/**Protected routes */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth link={"/"}>
               <Landing />
              </RequireAuth>
            }
          />
           <Route
            path="/create-event"
            element={
              <RequireAuth link={"/"}>
             <CreateEvent />
              </RequireAuth>
            }
          />
           <Route
            path="/participants/:id"
            element={
              <RequireAuth link={"/"}>
              <Participants />
              </RequireAuth>
            }
          />
           <Route
            path="/shortlisted"
            element={
              <RequireAuth link={"/"}>
             <ShortListed />
              </RequireAuth>
            }
          />
           <Route
            path="/events"
            element={
              <RequireAuth link={"/"}>
              <Events />
              </RequireAuth>
            }
          />
        
        </Routes>
      </Router>
    </div>
  );
};

export default App;
