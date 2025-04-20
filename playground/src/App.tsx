import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Page2 from './pages/Page2';
import Home from './pages/Home';
import Layout from './pages/Layout';
import { AnimatePresence } from 'motion/react';
import { OverlayProvider } from '@fewings/react/overlay';

function App() {
  return (
    <OverlayProvider wrapper={AnimatePresence}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/page2'} element={<Page2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OverlayProvider>
  );
}

export default App;
