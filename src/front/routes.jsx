// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Signup } from "./pages/Signup";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Homepage */}
      <Route index element={<Signup />} />

      {/* Auth Routes */}
      <Route path="signup" element={<Signup />} />



      {/* Other Routes */}
      <Route path="single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="demo" element={<Demo />} />
    </Route>
  )
);