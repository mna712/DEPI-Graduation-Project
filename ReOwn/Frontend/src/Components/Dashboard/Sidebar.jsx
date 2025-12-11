import React from 'react';
import { ShoppingBag, Users, FileText, Settings, BarChart2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'overview', path: '/dashboard', icon: <BarChart2 className="w-6 h-6" />, label: 'Overview' },
    { id: 'products', path: '/dashboard/products', icon: <ShoppingBag className="w-6 h-6" />, label: 'Products' },
    {
      id: 'categories',
      path: '/dashboard/categories',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Categories'
    },
    { id: 'users', path: '/dashboard/users', icon: <Users className="w-6 h-6" />, label: 'Users' },
    { id: 'reports', path: '/dashboard/reports', icon: <FileText className="w-6 h-6" />, label: 'Reports' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    <div className="w-20 bg-white shadow-sm flex flex-col items-center py-4 space-y-6">
      <button 
        onClick={() => navigate('/')}
        className="p-3 rounded-lg hover:bg-gray-100"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => handleNavigation(item.path)}
          className={`p-3 rounded-lg flex flex-col items-center ${
            isActive(item.path) 
              ? item.id === 'categories' 
                ? 'bg-green-50 text-green-600' 
                : 'bg-gray-100 text-gray-900' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          {item.icon}
          <div className="text-xs mt-1">{item.label}</div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;