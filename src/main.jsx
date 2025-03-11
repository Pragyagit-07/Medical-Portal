//import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from './App.jsx';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Error from "./component/Error/Error.jsx";
import About from './pages/About/About.jsx';
import SearchPatient from './pages/SearchPatient/SearchPatient.jsx';
import Profile from "./component/Profile/Profile.jsx";
import './index.css';
import Signin from './pages/Signin/Signin.jsx';
import RegisterPatient from "./pages/RegisterPatient/RegisterPatient.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterDoctor from "./pages/RegisterDoctor/RegisterDoctor.jsx";
import SearchDoctor from './pages/SearchDoctor/SearchDoctor.jsx';
import Layout from "./Layout.jsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";

const router = createBrowserRouter([
{
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      path: "/",
      element: <App />,

    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/searchpatient",
      element: <SearchPatient />,

    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
       path: "/registerpatient",
      element: <RegisterPatient />,
    },
    {
      path: "/searchdoctor",
      element: <SearchDoctor />,
    },
    {
      path: "/registerdoctor",
      element: <RegisterDoctor />,
    },
    {
      path:"/adminpanel",
      element: <AdminPanel />,
    },
  ],
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // < React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
);
