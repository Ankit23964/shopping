import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SearchOverlay from '../search/SearchOverlay';
import Toast from '../common/Toast';
import { useAppSelector } from '../../hooks/useAppSelector';

const Layout: React.FC = () => {
  const { isSearchOpen, notifications } = useAppSelector((state) => state.ui);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      
      {/* Overlays and Modals */}
      {isSearchOpen && <SearchOverlay />}
      
      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;