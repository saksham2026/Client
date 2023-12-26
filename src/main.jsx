import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import EntryPage from "./Pages/General/EntryPage.jsx";
import LoginPage from "./Pages/General/LoginPage.jsx";
import RegisterPage from "./Pages/General/RegisterPage.jsx";
import ProfilePage from "./Pages/General/ProfilePage.jsx";
import { createBrowserRouter,
          RouterProvider,
} from 'react-router-dom'
import ProducerDashboard from "./Pages/ProducerPages/ProducerDashboard.jsx";
import FreelancerPovProducer from "./Pages/FreelancerPages/FreelancerPovProducer.jsx";
import ProducerPovToOthers from "./Pages/ProducerPages/ProducerPovToOthers.jsx";
import ContactPage from "./Pages/General/ContactPage.jsx";
import PostJob from "./Pages/ProducerPages/PostJob.jsx";
import FreelancerDashboard from "./Pages/FreelancerPages/FreelancerDashboard.jsx";
import JobDetail from "./Pages/General/JobDetail.jsx";
import Dashboard from "./Pages/General/Dashboard.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if(process.env.NODE_ENV === 'production') disableReactDevTools()

const Router = createBrowserRouter([
  {
    path: '/',
    element: <EntryPage/>
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/register',
    element: <RegisterPage/>,
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/freelancerdashboard',
    element: <FreelancerDashboard/>
  },
  {
    path: '/producerdashboard',
    element: <ProducerDashboard/>
  },
  {
    path: '/freelancer/:username',
    element: <FreelancerPovProducer/>,
  },
  {
    path: '/producer/:username',
    element:<ProducerPovToOthers/>
  },
  {
    path: '/contact/:username',
    element:<ContactPage/>
  },
  {
    path: '/postjob',
    element: <PostJob/>
  },
  {
    path: '/job/:jobId',
    element: <JobDetail/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={ Router } />
  </React.StrictMode>
);
