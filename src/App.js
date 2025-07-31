import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Home, BarChart2, Table, Moon, Sun, Filter, Download, Search, Calendar, 
  TrendingUp, Users, DollarSign, Target, Activity, Settings,
  MessageSquare, Bot, Sparkles, Eye, EyeOff, RefreshCw, Play, Pause,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle, Clock,
  ShoppingCart, MousePointer, Eye as EyeIcon, Zap
} from 'lucide-react';

// --- ADmyBRAND Analytics Data Generation ---
const generateADmyBRANDData = () => {
  const now = new Date();
  const days = 30;

  const dailyData = Array.from({ length: days }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (days - 1 - i));
    const formattedDate = date.toISOString().split('T')[0];

    return {
      date: formattedDate,
      revenue: Math.floor(Math.random() * 5000) + 1000,
      users: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 200) + 50,
      impressions: Math.floor(Math.random() * 10000) + 5000,
      clicks: Math.floor(Math.random() * 500) + 100,
      ctr: Math.random() * 5 + 1, // 1-6%
      cpc: Math.random() * 2 + 0.5, // $0.5-$2.5
    };
  });

  const totalRevenue = dailyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalUsers = dailyData.reduce((sum, d) => sum + d.users, 0);
  const totalConversions = dailyData.reduce((sum, d) => sum + d.conversions, 0);
  const totalImpressions = dailyData.reduce((sum, d) => sum + d.impressions, 0);

  const prevTotalRevenue = dailyData.slice(0, days / 2).reduce((sum, d) => sum + d.revenue, 0);
  const currentTotalRevenue = dailyData.slice(days / 2).reduce((sum, d) => sum + d.revenue, 0);
  const growthPercentage = ((currentTotalRevenue - prevTotalRevenue) / prevTotalRevenue * 100).toFixed(2);

  const campaignData = Array.from({ length: 50 }, (_, i) => ({
    id: `CAM-${1000 + i}`,
    campaign: `Campaign ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
    date: new Date(now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    spend: (Math.random() * 1000 + 100).toFixed(2),
    impressions: Math.floor(Math.random() * 100000) + 10000,
    clicks: Math.floor(Math.random() * 5000) + 500,
    conversions: Math.floor(Math.random() * 100) + 10,
    ctr: (Math.random() * 5 + 1).toFixed(2),
    cpc: (Math.random() * 2 + 0.5).toFixed(2),
    status: ['Active', 'Paused', 'Completed'][Math.floor(Math.random() * 3)],
  }));

  const channelData = [
    { name: 'Google Ads', value: 45, color: '#4285F4' },
    { name: 'Facebook Ads', value: 30, color: '#1877F2' },
    { name: 'Instagram Ads', value: 15, color: '#E4405F' },
    { name: 'LinkedIn Ads', value: 10, color: '#0A66C2' },
  ];

  const performanceMetrics = {
    revenue: totalRevenue,
    users: totalUsers,
    conversions: totalConversions,
    growth: parseFloat(growthPercentage),
    impressions: totalImpressions,
    avgCTR: dailyData.reduce((sum, d) => sum + d.ctr, 0) / days,
    avgCPC: dailyData.reduce((sum, d) => sum + d.cpc, 0) / days,
  };

  return {
    metrics: performanceMetrics,
    dailyMetrics: dailyData,
    campaigns: campaignData,
    channels: channelData,
  };
};

// --- Theme Context ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Update body background based on theme
    if (theme === 'light') {
      document.body.className = 'bg-gray-50 text-gray-900';
    } else {
      document.body.className = 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Reusable Components ---

const LoadingSkeleton = ({ type = 'card' }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const containerClasses = isDark 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
    : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300';
  
  const skeletonClasses = isDark 
    ? 'bg-gray-700' 
    : 'bg-gray-300';
  
  if (type === 'card') {
    return (
      <div className={`${containerClasses} rounded-2xl p-6 animate-pulse h-36 border`}>
        <div className={`h-4 ${skeletonClasses} rounded w-3/4 mb-4`}></div>
        <div className={`h-8 ${skeletonClasses} rounded w-1/2`}></div>
      </div>
    );
  }
  if (type === 'chart') {
    return (
      <div className={`${containerClasses} rounded-2xl p-6 animate-pulse h-80 flex items-center justify-center border`}>
        <div className={`h-full w-full ${skeletonClasses} rounded`}></div>
      </div>
    );
  }
  if (type === 'table') {
    return (
      <div className={`${containerClasses} rounded-2xl p-6 animate-pulse border`}>
        <div className={`h-8 ${skeletonClasses} rounded w-full mb-4`}></div>
        <div className={`h-6 ${skeletonClasses} rounded w-full mb-2`}></div>
        <div className={`h-6 ${skeletonClasses} rounded w-full mb-2`}></div>
        <div className={`h-6 ${skeletonClasses} rounded w-full mb-2`}></div>
        <div className={`h-6 ${skeletonClasses} rounded w-full`}></div>
      </div>
    );
  }
  return null;
};

const MetricCard = ({ title, value, change, icon: Icon, isLoading, gradient = 'from-blue-500 to-purple-600' }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const changeColorClass = change >= 0 ? 'text-green-300' : 'text-yellow-300';
  const arrow = change >= 0 ? '▲' : '▼';

  if (isLoading) {
    return <LoadingSkeleton type="card" />;
  }

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border ${isDark ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/90 dark:text-gray-900">{title}</h3>
        {Icon && <Icon className="text-white/80 dark:text-gray-700 w-6 h-6" />}
      </div>
      <div className="text-4xl font-bold text-white dark:text-gray-900 mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {change !== undefined && (
        <p className={`text-sm ${changeColorClass} font-medium flex items-center`}>
          <span className="mr-1">{arrow}</span>
          {Math.abs(change)}% vs last period
        </p>
      )}
    </div>
  );
};

const ChartContainer = ({ title, children, isLoading, gradient = 'from-gray-800 to-gray-900 dark:from-gray-100 to-gray-200' }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  if (isLoading) {
    return <LoadingSkeleton type="chart" />;
  }
  
  const containerClasses = isDark 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
    : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300/50';
  
  const titleClasses = isDark 
    ? 'text-white/90' 
    : 'text-gray-900';
  
  return (
    <div className={`${containerClasses} rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl border ${containerClasses.includes('border-gray-700') ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
      <h3 className={`text-lg font-semibold ${titleClasses} mb-4`}>{title}</h3>
      <div className="h-80 w-full">
        {children}
      </div>
    </div>
  );
};

const DataTable = ({ data, columns, isLoading }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (isLoading) {
    return <LoadingSkeleton type="table" />;
  }

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter((row) => {
    const matchesSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rowDate = new Date(row.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDateRange = (!start || rowDate >= start) && (!end || rowDate <= end);

    return matchesSearch && matchesDateRange;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`bg-gradient-to-br ${isDark ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'} rounded-2xl shadow-2xl p-6 border ${isDark ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
      <h3 className={`text-lg font-semibold ${isDark ? 'text-white/90' : 'text-gray-900'} mb-4`}>Campaign Performance</h3>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/3">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} size={18} />
          <input
            type="text"
            placeholder="Search campaigns..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-400 bg-gray-200 text-gray-900 placeholder-gray-600'} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-2/3">
          <div className="relative w-full sm:w-1/2">
            <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} size={18} />
            <input
              type="date"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-400 bg-gray-200 text-gray-900'} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-1/2">
            <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} size={18} />
            <input
              type="date"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-400 bg-gray-200 text-gray-900'} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
        <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-300'}`}>
          <thead className={isDark ? 'bg-gray-700' : 'bg-gray-200'}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} uppercase tracking-wider cursor-pointer transition-colors`}
                  onClick={() => handleSort(col.accessor)}
                >
                  <div className="flex items-center">
                    {col.header}
                    {sortColumn === col.accessor && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-300'}`}>
            {currentItems.length > 0 ? (
              currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-150`}>
                  {columns.map((col) => (
                    <td key={col.accessor} className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={`px-6 py-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No data available for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const LineChartComponent = ({ data, dataKey, name, color, gradient = false }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      {gradient ? (
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
          />
          <YAxis 
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: isDark ? '#f9fafb' : '#111827'
            }}
          />
          <Area type="monotone" dataKey={dataKey} name={name} stroke={color} fill={`url(#gradient-${dataKey})`} strokeWidth={2} />
        </AreaChart>
      ) : (
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
          />
          <YAxis 
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
            axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: isDark ? '#f9fafb' : '#111827'
            }}
          />
          <Line type="monotone" dataKey={dataKey} name={name} stroke={color} strokeWidth={3} dot={{ fill: color, strokeWidth: 2, r: 4 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

const BarChartComponent = ({ data, dataKey, name, color }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis 
          dataKey="date" 
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
        />
        <YAxis 
          tick={{ fill: isDark ? "#9ca3af" : "#6b7280" }}
          axisLine={{ stroke: isDark ? "#374151" : "#e5e7eb" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: isDark ? '#f9fafb' : '#111827'
          }}
        />
        <Bar dataKey={dataKey} name={name} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieChartComponent = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            color: isDark ? '#f9fafb' : '#111827'
          }}
        />
        <Legend 
          wrapperStyle={{
            color: isDark ? '#f9fafb' : '#111827'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// --- Main ADmyBRAND Dashboard App ---
const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setData(generateADmyBRANDData());
        setIsLoading(false);
      }, 1500);
    };

    fetchData();
    const interval = setInterval(() => {
      setData(generateADmyBRANDData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = async (format) => {
    setIsExporting(true);
    if (format === 'CSV') {
      if (!data || !data.campaigns) {
        console.error("No data to export.");
        setIsExporting(false);
        return;
      }

      const headers = ['ID', 'Campaign', 'Date', 'Spend', 'Impressions', 'Clicks', 'Conversions', 'CTR', 'CPC', 'Status'].join(',');
      const rows = data.campaigns.map(row => [
        row.id,
        row.campaign,
        row.date,
        row.spend,
        row.impressions,
        row.clicks,
        row.conversions,
        row.ctr,
        row.cpc,
        row.status
      ].join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'admybrand_campaign_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
          } else if (format === 'PDF') {
        try {
          // Load jsPDF dynamically
          const { jsPDF } = await import('jspdf');
          
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          // Add white background (no dark background)
          pdf.setFillColor(255, 255, 255); // White background
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          
          // Add brand text image as main header
          try {
            const brandTextResponse = await fetch('/brand_sample_text.png');
            if (brandTextResponse.ok) {
              const brandTextBlob = await brandTextResponse.blob();
              const brandTextBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(brandTextBlob);
              });
              
              pdf.addImage(brandTextBase64, 'PNG', pageWidth / 2 - 40, 15, 80, 20);
            }
          } catch (brandTextError) {
            console.log('Brand text not available, continuing without it');
          }
          
          pdf.setFontSize(14);
          pdf.setTextColor(107, 114, 128); // Gray color
          pdf.text('Digital Marketing Analytics Report', pageWidth / 2, 45, { align: 'center' });
          
          // Add report metadata
          pdf.setFontSize(10);
          pdf.setTextColor(75, 85, 99);
          pdf.text(`Report Generated: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}`, pageWidth / 2, 55, { align: 'center' });
          
          // Add company details in a styled box
          pdf.setFillColor(240, 249, 255); // Light blue background
          pdf.rect(20, 65, pageWidth - 40, 25, 'F');
          pdf.setDrawColor(59, 130, 246);
          pdf.rect(20, 65, pageWidth - 40, 25, 'S');
          
          pdf.setFontSize(12);
          pdf.setTextColor(59, 130, 246);
          pdf.text('ADmyBRAND Analytics Platform', 25, 75);
          
          pdf.setFontSize(9);
          pdf.setTextColor(30, 58, 138);
          pdf.text('123 Marketing Street, Digital City, DC 12345', 25, 82);
          pdf.text('Phone: +1 (555) 123-4567 | Email: insights@admybrand.com', 25, 88);
          
          // Add metrics summary with better styling
          pdf.setFontSize(16);
          pdf.setTextColor(59, 130, 246);
          pdf.text('Key Performance Metrics', 20, 110);
          
          // Create metrics grid
          const metrics = [
            { label: 'Total Revenue', value: `$${data?.metrics.revenue.toLocaleString() || 0}` },
            { label: 'Total Users', value: data?.metrics.users.toLocaleString() || '0' },
            { label: 'Conversions', value: data?.metrics.conversions.toLocaleString() || '0' },
            { label: 'Growth Rate', value: `${data?.metrics.growth || 0}%` }
          ];
          
          let metricY = 125;
          metrics.forEach((metric, index) => {
            const x = 20 + (index % 2) * 85;
            const y = metricY + Math.floor(index / 2) * 15;
            
            // Metric box
            pdf.setFillColor(240, 249, 255);
            pdf.rect(x, y - 8, 80, 12, 'F');
            pdf.setDrawColor(59, 130, 246);
            pdf.rect(x, y - 8, 80, 12, 'S');
            
            pdf.setFontSize(9);
            pdf.setTextColor(30, 58, 138);
            pdf.text(metric.label, x + 2, y - 2);
            
            pdf.setFontSize(10);
            pdf.setTextColor(59, 130, 246);
            pdf.text(metric.value, x + 2, y + 3);
          });
          
          // Add campaign data table with better styling
          pdf.setFontSize(16);
          pdf.setTextColor(59, 130, 246);
          pdf.text('Campaign Performance Data', 20, 175);
          
          // Table styling
          const tableHeaders = ['Campaign', 'Spend', 'Impressions', 'Clicks', 'Conversions'];
          const tableY = 185;
          
          // Table header background
          pdf.setFillColor(59, 130, 246);
          pdf.rect(20, tableY - 8, pageWidth - 40, 8, 'F');
          
          pdf.setFontSize(9);
          pdf.setTextColor(255, 255, 255);
          tableHeaders.forEach((header, index) => {
            const x = 22 + (index * 35);
            pdf.text(header, x, tableY - 2);
          });
          
          // Table data
          pdf.setFontSize(8);
          pdf.setTextColor(30, 58, 138);
          
          const sampleData = data?.campaigns.slice(0, 15) || [];
          let currentY = tableY + 5;
          
          sampleData.forEach((campaign, index) => {
            if (currentY > pageHeight - 40) {
              pdf.addPage();
              currentY = 20;
            }
            
            // Alternate row colors
            if (index % 2 === 0) {
              pdf.setFillColor(240, 249, 255);
              pdf.rect(20, currentY - 6, pageWidth - 40, 6, 'F');
            }
            
            pdf.text(campaign.campaign.substring(0, 20), 22, currentY);
            pdf.text(`$${campaign.spend}`, 57, currentY);
            pdf.text(campaign.impressions.toLocaleString(), 92, currentY);
            pdf.text(campaign.clicks.toLocaleString(), 127, currentY);
            pdf.text(campaign.conversions.toString(), 162, currentY);
            
            currentY += 6;
          });
          
          // Add footer with light blue background
          pdf.setFillColor(240, 249, 255);
          pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');
          pdf.setDrawColor(59, 130, 246);
          pdf.rect(0, pageHeight - 15, pageWidth, 15, 'S');
          
          pdf.setFontSize(8);
          pdf.setTextColor(30, 58, 138);
          pdf.text('© 2024 ADmyBRAND Analytics. All rights reserved.', pageWidth / 2, pageHeight - 8, { align: 'center' });
          pdf.text('Professional Digital Marketing Analytics Platform', pageWidth / 2, pageHeight - 4, { align: 'center' });
          
          pdf.save('admybrand_analytics_report.pdf');
          setIsExporting(false);
        } catch (error) {
          console.error('PDF generation failed:', error);
          alert('PDF export failed. Please try again.');
          setIsExporting(false);
        }
      }
  };

  const tableColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Campaign', accessor: 'campaign' },
    { header: 'Date', accessor: 'date' },
    { header: 'Spend ($)', accessor: 'spend' },
    { header: 'Impressions', accessor: 'impressions' },
    { header: 'Clicks', accessor: 'clicks' },
    { header: 'Conversions', accessor: 'conversions' },
    { header: 'CTR (%)', accessor: 'ctr' },
    { header: 'CPC ($)', accessor: 'cpc' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className={`flex min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'} font-inter transition-colors duration-300`}>
      {/* Sidebar Navigation */}
      <aside className={`w-20 sm:w-64 ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl'} flex flex-col items-center sm:items-start py-8 px-2 sm:px-6 border-r ${theme === 'light' ? 'border-gray-200' : 'border-gray-700/50'} transition-colors duration-300`}>
        <div className="flex flex-col items-center sm:items-start mb-10">
          <img 
            src="/brand_logo.png" 
            alt="ADmyBRAND Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 mb-3 rounded-lg shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <img 
            src="/brand_sample_text.png" 
            alt="ADmyBRAND" 
            className="w-24 sm:w-36 h-6 sm:h-8 mb-2"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hidden sm:block" style={{display: 'none'}}>
            ADmyBRAND
          </div>
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 block sm:hidden" style={{display: 'none'}}>
            AD
          </div>
        </div>
        
        <nav className="flex flex-col space-y-4 w-full">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : theme === 'light' 
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            <Home className="w-6 h-6 mr-0 sm:mr-3" />
            <span className="hidden sm:block">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'charts'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : theme === 'light' 
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            <BarChart2 className="w-6 h-6 mr-0 sm:mr-3" />
            <span className="hidden sm:block">Charts</span>
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
              activeTab === 'table'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : theme === 'light' 
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            <Table className="w-6 h-6 mr-0 sm:mr-3" />
            <span className="hidden sm:block">Data Table</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src="/brand_logo.png" 
              alt="ADmyBRAND Logo" 
              className="w-12 h-12 rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                {activeTab === 'overview' && 'Insights Overview'}
                {activeTab === 'charts' && 'Interactive Analytics Charts'}
                {activeTab === 'table' && 'Campaign Performance Data'}
              </h1>
              <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Digital marketing analytics platform for agencies</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'} transition-all duration-200 shadow-lg`}
            >
              {theme === 'light' ? <Moon className="w-6 h-6 text-gray-700" /> : <Sun className="w-6 h-6 text-gray-200" />}
            </button>
            <button
              onClick={() => handleExport('CSV')}
              disabled={isExporting}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : <><Download className="w-5 h-5 mr-2" /> Export CSV</>}
            </button>
            <button
              onClick={() => handleExport('PDF')}
              disabled={isExporting}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {isExporting ? 'Exporting...' : <><Download className="w-5 h-5 mr-2" /> Export PDF</>}
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Revenue"
                value={data ? `$${data.metrics.revenue.toLocaleString()}` : '$0'}
                change={data?.metrics.growth || 0}
                icon={DollarSign}
                gradient="from-green-500 to-green-600"
                isLoading={isLoading}
              />
              <MetricCard
                title="Total Users"
                value={data ? data.metrics.users.toLocaleString() : '0'}
                change={data?.metrics.growth || 0}
                icon={Users}
                gradient="from-blue-500 to-blue-600"
                isLoading={isLoading}
              />
              <MetricCard
                title="Conversions"
                value={data ? data.metrics.conversions.toLocaleString() : '0'}
                change={data?.metrics.growth || 0}
                icon={ShoppingCart}
                gradient="from-purple-500 to-purple-600"
                isLoading={isLoading}
              />
              <MetricCard
                title="Growth Rate"
                value={data ? `${data.metrics.growth}%` : '0%'}
                change={data?.metrics.growth || 0}
                icon={TrendingUp}
                gradient="from-orange-500 to-orange-600"
                isLoading={isLoading}
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartContainer title="Revenue Over Time" isLoading={isLoading}>
                <LineChartComponent data={data?.dailyMetrics} dataKey="revenue" name="Revenue" color="#10b981" gradient={true} />
              </ChartContainer>
              <ChartContainer title="User Growth" isLoading={isLoading}>
                <BarChartComponent data={data?.dailyMetrics} dataKey="users" name="Users" color="#3b82f6" />
              </ChartContainer>
              <ChartContainer title="Channel Distribution" isLoading={isLoading}>
                <PieChartComponent data={data?.channels} />
              </ChartContainer>
              <ChartContainer title="Conversion Trends" isLoading={isLoading}>
                <LineChartComponent data={data?.dailyMetrics} dataKey="conversions" name="Conversions" color="#8b5cf6" />
              </ChartContainer>
            </section>
          </>
        )}

        {activeTab === 'charts' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="Revenue Over Time" isLoading={isLoading}>
              <LineChartComponent data={data?.dailyMetrics} dataKey="revenue" name="Revenue" color="#10b981" gradient={true} />
            </ChartContainer>
            <ChartContainer title="User Growth" isLoading={isLoading}>
              <BarChartComponent data={data?.dailyMetrics} dataKey="users" name="Users" color="#3b82f6" />
            </ChartContainer>
            <ChartContainer title="Channel Distribution" isLoading={isLoading}>
              <PieChartComponent data={data?.channels} />
            </ChartContainer>
            <ChartContainer title="Conversion Trends" isLoading={isLoading}>
              <LineChartComponent data={data?.dailyMetrics} dataKey="conversions" name="Conversions" color="#8b5cf6" />
            </ChartContainer>
          </section>
        )}

        {(activeTab === 'overview' || activeTab === 'table') && (
          <section>
            <DataTable data={data?.campaigns || []} columns={tableColumns} isLoading={isLoading} />
          </section>
        )}
      </main>
    </div>
  );
};

// Root component
function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
