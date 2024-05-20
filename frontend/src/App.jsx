import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './pages/SignUpPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import PrivateRoutes from './components/PrivateRoutes';

//TODO add protected routes - session notes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
//check for token
export default App;
