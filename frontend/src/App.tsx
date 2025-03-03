import { Provider } from "jotai";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/authProvider";
import { SignIn } from "./components/SignInForm";

function App() {
  return (
    <Provider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
