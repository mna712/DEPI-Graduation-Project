<<<<<<< HEAD
import React, { useState } from 'react';
import { User, ShoppingBag, FileText } from 'lucide-react';

// Default data (from your JSON)
const defaultData = {
  admin: {
    name: "Ahmed Ali",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hana"
  },
  stats: [
    { id: 1, icon: "user", label: "Total Users", value: "1,245" },
    { id: 2, icon: "shopping", label: "Total Products", value: "748" },
    { id: 3, icon: "file", label: "Reports", value: "90" }
  ],
  saleGraph: {
    tabs: ["Weekly", "Monthly", "Yearly"],
    defaultTab: "Monthly",
    Weekly: { data: [ { date: "Mon", value: 85 }, { date: "Tue", value: 95 }, { date: "Wed", value: 110 }, { date: "Thu", value: 90 }, { date: "Fri", value: 130 }, { date: "Sat", value: 150 }, { date: "Sun", value: 120 } ] },
    Monthly: { data: [ { date: "Apr 23", value: 110 }, { date: "Apr 24", value: 120 }, { date: "Apr 25", value: 135 }, { date: "Apr 26", value: 140 }, { date: "Apr 27", value: 150 }, { date: "Apr 28", value: 135 }, { date: "Apr 29", value: 170 } ] },
    Yearly: { data: [ { date: "Jan", value: 100 }, { date: "Feb", value: 115 }, { date: "Mar", value: 125 }, { date: "Apr", value: 140 }, { date: "May", value: 155 }, { date: "Jun", value: 145 }, { date: "Jul", value: 160 } ] }
  },
  recentActivities: [
    { id: 1, type: "product", title: "New Product Added", user: "Michael Brown", date: "2024-2-14 8:23 am" },
    { id: 2, type: "user", title: "New User Registered", user: "Sarah Johnson", date: "2024-2-14 8:23 am" },
    { id: 3, type: "product", title: "New Product Added", user: "David Wilson", date: "2024-2-14 8:23 am" },
    { id: 4, type: "user", title: "New User Registered", user: "Emma Davis", date: "2024-2-14 8:23 am" }
  ]
};

function Overview({ data = defaultData }) {
  const [activeTab, setActiveTab] = useState(data.saleGraph.defaultTab);
  const currentChartData = data.saleGraph[activeTab]?.data || [];
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ShoppingBag, FileText } from 'lucide-react';

// Default data for sale graph (static for now)
const saleGraphData = {
  tabs: ["Weekly", "Monthly", "Yearly"],
  defaultTab: "Monthly",
  Weekly: { data: [ { date: "Mon", value: 85 }, { date: "Tue", value: 95 }, { date: "Wed", value: 110 }, { date: "Thu", value: 90 }, { date: "Fri", value: 130 }, { date: "Sat", value: 150 }, { date: "Sun", value: 120 } ] },
  Monthly: { data: [ { date: "Apr 23", value: 110 }, { date: "Apr 24", value: 120 }, { date: "Apr 25", value: 135 }, { date: "Apr 26", value: 140 }, { date: "Apr 27", value: 150 }, { date: "Apr 28", value: 135 }, { date: "Apr 29", value: 170 } ] },
  Yearly: { data: [ { date: "Jan", value: 100 }, { date: "Feb", value: 115 }, { date: "Mar", value: 125 }, { date: "Apr", value: 140 }, { date: "May", value: 155 }, { date: "Jun", value: 145 }, { date: "Jul", value: 160 } ] }
};

function Overview() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(saleGraphData.defaultTab);
  const currentChartData = saleGraphData[activeTab]?.data || [];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fetch stats
        const statsResponse = await axios.get('http://localhost:3000/api/dashboard/stats', config);
        setStats(statsResponse.data.data);

        // Fetch activities
        const activitiesResponse = await axios.get('http://localhost:3000/api/dashboard/activities', config);
        setActivities(activitiesResponse.data.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
>>>>>>> 8310b9d6 (updating)

  const getStatIcon = (iconName) => {
    const className = "w-5 h-5 text-gray-600";
    const icons = {
      user: <User className={className} />,
      shopping: <ShoppingBag className={className} />,
      file: <FileText className={className} />
    };
    return icons[iconName];
  };

<<<<<<< HEAD
  const getActivityIcon = (type) => type === 'product' 
    ? <ShoppingBag className="w-5 h-5 text-green-700" /> 
=======
  const getActivityIcon = (type) => type === 'product'
    ? <ShoppingBag className="w-5 h-5 text-green-700" />
>>>>>>> 8310b9d6 (updating)
    : <User className="w-5 h-5 text-green-700" />;

  const generatePath = (data) => {
    return data.map((item, index) => {
      const x = 60 + index * 60;
      const y = 180 - (item.value * 0.8);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

<<<<<<< HEAD
  return (
    <div className="flex-1 p-8">
=======
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const statsData = stats ? [
    { id: 1, icon: "user", label: "Total Users", value: stats.totalUsers.toString() },
    { id: 2, icon: "shopping", label: "Total Products", value: stats.totalProducts.toString() },
    { id: 3, icon: "file", label: "Reports", value: stats.totalReports.toString() }
  ] : [];

  return (
    <div className="p-8">
>>>>>>> 8310b9d6 (updating)
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
        <div className="flex items-center gap-2">
<<<<<<< HEAD
          <span className="text-sm text-gray-600">{data.admin.name}</span>
          <img src={data.admin.avatar} alt="Admin" className="w-10 h-10 rounded-full" />
=======
          <span className="text-sm text-gray-600">Admin</span>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hana" alt="Admin" className="w-10 h-10 rounded-full" />
>>>>>>> 8310b9d6 (updating)
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
<<<<<<< HEAD
        {data.stats.map(stat => (
=======
        {statsData.map(stat => (
>>>>>>> 8310b9d6 (updating)
          <div key={stat.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {getStatIcon(stat.icon)}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sale Graph */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Sale Graph</h2>
          <div className="flex gap-2">
<<<<<<< HEAD
            {data.saleGraph.tabs.map(tab => (
=======
            {saleGraphData.tabs.map(tab => (
>>>>>>> 8310b9d6 (updating)
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
<<<<<<< HEAD
                  activeTab === tab 
                    ? 'bg-teal-500 text-white' 
=======
                  activeTab === tab
                    ? 'bg-teal-500 text-white'
>>>>>>> 8310b9d6 (updating)
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 600 200">
            <text x="10" y="20" className="text-xs fill-gray-500">200</text>
            <text x="10" y="70" className="text-xs fill-gray-500">150</text>
            <text x="10" y="120" className="text-xs fill-gray-500">100</text>
            <text x="10" y="170" className="text-xs fill-gray-500">50</text>
            <path d={generatePath(currentChartData)} fill="none" stroke="#06b6d4" strokeWidth="2"/>
            {currentChartData.map((item, i) => (
              <text key={i} x={60 + i * 60} y="195" className="text-xs fill-gray-500">{item.date}</text>
            ))}
          </svg>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-3">
<<<<<<< HEAD
          {data.recentActivities.map(activity => (
=======
          {activities.length > 0 ? activities.map(activity => (
>>>>>>> 8310b9d6 (updating)
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.user} • {activity.date}</div>
              </div>
            </div>
<<<<<<< HEAD
          ))}
=======
          )) : (
            <div className="text-center text-gray-500 py-4">No recent activities</div>
          )}
>>>>>>> 8310b9d6 (updating)
        </div>
      </div>
    </div>
  );
}

export default Overview;