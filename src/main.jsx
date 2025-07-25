import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { App as AppWrapper, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Toast
import ToastHandler from "./helpers/ToastHandler";

// Error Fallback & Loader
import { ErrorFallbackPage, SiteLoader } from "./helpers/utils";

// Store
import store from "./store";

// AOS
import "aos/dist/aos.css";

// Swiper JS CSS
import "swiper/css";
import "swiper/css/navigation";

// App Css(Main CSS)
import "./assets/css/style.scss";

// Component
import "./Components/style.scss";

// Lazy-loaded Pages
const PageNotFound = lazy(() => import("./Components/Error.jsx"));

// Auth
const Login = lazy(() => import("./Auth/Login.jsx"));

const Index = lazy(() => import("./Pages/Index.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const ThemeIndex = lazy(() => import("./Pages/Theme/Index.jsx"));
const Theme = lazy(() => import("./Pages/Theme/Index.jsx"));
const PackageIndex = lazy(() => import("./Pages/Package/Index.jsx"));
const Package = lazy(() => import("./Pages/Package/Package.jsx"));

// Create root for React 18
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Project Change */}
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins",
          colorPrimary: "#14183e",
        },
      }}
    >
      <AppWrapper>
        <Provider store={store}>
          <BrowserRouter basename="">
            <Suspense fallback={<SiteLoader />}>
              <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
                <Routes>
                  <Route path="/auth">
                    <Route path="login" element={<Login />} />
                  </Route>

                  <Route path="/" element={<Index />}>
                    <Route path="" element={<Home />} />
                    <Route path="theme">
                      <Route path="" element={<ThemeIndex />} />
                      <Route path="add" element={<Theme />} />
                      <Route path=":id/edit" element={<Theme />} />
                    </Route>
                    <Route path="package">
                      <Route path="" element={<PackageIndex />} />
                      <Route path="add" element={<Package />} />
                      <Route path=":id/edit" element={<Package />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
            <ToastHandler />
          </BrowserRouter>
        </Provider>
      </AppWrapper>
    </ConfigProvider>
  </React.StrictMode>
);
