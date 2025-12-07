import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';

export default function Reports() {
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const initialReports = [
    {
      id: 1,
      title: 'Spam',
      date: '22/5/2025',
      author: 'john smith',
      tag: 'Spam',
      tagColor: 'bg-gray-300',
    },
    {
      id: 2,
      title: 'Inappropriate profile picture',
      date: '22/5/2025',
      author: 'john smith',
      tag: 'Inappropriate profile picture',
      tagColor: 'bg-purple-200',
    },
    {
      id: 3,
      title: 'Fraud',
      date: '22/5/2025',
      author: 'john smith',
      tag: 'Fraud',
      tagColor: 'bg-gray-300',
    },
    {
      id: 4,
      title: 'This user insulting me',
      date: '22/5/2025',
      author: 'john smith',
      tag: 'This user is insulting me',
      tagColor: 'bg-teal-200',
    },
  ];

  const [reports] = useState(initialReports);

  const filteredReports = reports
    .filter(
      (report) =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Reports
          </h1>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm sm:text-base font-semibold text-gray-700">HE</span>
            </div>
            <div className="text-left">
              <p className="text-sm sm:text-base font-semibold text-gray-800">Hana Elsendy</p>
              <p className="text-xs sm:text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        {/* Total Reports Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 w-full sm:w-auto inline-block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-gray-800">80</p>
              <p className="text-sm sm:text-base text-gray-500">Total Reports</p>
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Recent Reports</h2>

          {/* Search + Sort - Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title, author or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm sm:text-base"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  {/* Left Side - Icon + Info */}
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{report.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{report.date}</span>
                        <span className="hidden xs:inline">•</span>
                        <span className="truncate max-w-[120px] sm:max-w-none">By {report.author}</span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${report.tagColor} whitespace-nowrap`}
                        >
                          {report.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm whitespace-nowrap w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
                No reports found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}