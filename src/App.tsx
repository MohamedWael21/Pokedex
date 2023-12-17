import Background from "./components/Background";
import Footer from "./sections/Footer";
import Navbar from "./sections/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./scss/index.scss";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { firebaseAuth } from "./utils/firebaseConfig";
function App() {
  const { toasts } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (toasts.length) {
      const toasOption: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((toastMsg) => {
        toast(toastMsg, toasOption);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(setUserStatus({ email: user.email, uid: user.uid }));
      }
    });
  }, []);
  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<MyList />} path="/list" />
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
