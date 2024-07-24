import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home, Charts, Sensors } from "@/pages";
import { RootLayout, MainLayout } from "@/layouts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="charts" element={<Charts />} />
        <Route path="sensors" element={<Sensors />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
