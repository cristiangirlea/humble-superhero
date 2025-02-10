import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuperheroPage from "./pages/SuperheroPage";
import './styles/styles.css'

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 p-4">
                <nav className="bg-white shadow-md p-4 mb-4 rounded-lg">
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/superheroes" className="text-blue-600 hover:underline">Superheroes</Link>
                        </li>
                    </ul>
                </nav>

                {/* Route Handling */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/superheroes" element={<SuperheroPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
