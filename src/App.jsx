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
  SingleParticipant,
  Categories,
  CreateCategory,
  CategoryDetail,
  Talents
 
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
            path="/shortlisted/:id"
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
           <Route
            path="/create-category"
            element={
              <RequireAuth link={"/"}>
              <CreateCategory />
              </RequireAuth>
            }
          />
            <Route
            path="/category"
            element={
              <RequireAuth link={"/"}>
              <Categories />
              </RequireAuth>
            }
          />
             <Route
            path="/talents"
            element={
              <RequireAuth link={"/"}>
              <Talents />
              </RequireAuth>
            }
          />
             <Route
            path="/category/:id"
            element={
              <RequireAuth link={"/"}>
              <CategoryDetail />
              </RequireAuth>
            }
          />
            <Route
            path="/event/participant/:id"
            element={
              <RequireAuth link={"/"}>
              <SingleParticipant />
              </RequireAuth>
            }
          />
        
        </Routes>
      </Router>
    </div>
  );
};

export default App;
