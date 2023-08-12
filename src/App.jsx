import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Scrolltotop from "./components/UI/ScrollToTop";
//import { RequireAuth } from "./Utils/RequireAuth";
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

      
          <Route exact path="/login" element={<Login />} />
          {/*    LANDING PAGE  */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/create-event" element={<CreateEvent />} />
          <Route exact path="/participants" element={<Participants />} />
          <Route exact path="/shortlisted" element={<ShortListed />} />
          <Route exact path="/events" element={<Events />} />
   
      
          {/**Protected routes */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
