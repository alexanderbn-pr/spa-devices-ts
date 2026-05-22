import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Device from './pages/device/device';
import DeviceDetails from './pages/deviceDetails/deviceDetails';
import Header from './components/header/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/device" replace />} />
        <Route path="/device" element={<Device />} />
        <Route path="/deviceDetails/:id" element={<DeviceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
