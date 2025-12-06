import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report/Report";
import EditProfile from "./EditProfile/EditProfile";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
export default function Profile() {
  const navigate = useNavigate();
  const [show, setShow] = useState("none");
  const [api, setApi] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setApi(data.products));
  }, []);


  const handleEdit = (id) => {
    alert(`Edit product ${id}`); 
  };

  const handleDelete = (id) => {
    const filtered = api.filter((product) => product.id !== id);
    setApi(filtered);
  };

  // -----------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* PROFILE CARD */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col items-center">
                <img
                  className="w-24 h-24 mb-4 rounded-full object-cover border-4 border-gray-100"
                  src="https://picsum.photos/150"
                  alt="profile"
                />

                <h5 className="mb-1 text-xl font-semibold text-gray-900">
                  John Smith
                </h5>
                <span className="text-sm text-gray-600 mb-6">Johnsmith@gmail.com</span>

                {/* BUTTONS */}
                <div className="w-full space-y-3">
                  {/* EDIT PROFILE BUTTON */}
                  <button
                    onClick={() => navigate('/editProfile')}
                    className="flex items-center justify-center w-full text-gray-700 bg-white border border-gray-300
                      hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 font-medium text-sm
                      px-4 py-2.5 rounded-lg shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>

                  {/* SETTINGS BUTTON */}
                  <button
                    className="flex items-center justify-center w-full text-gray-700 bg-white border border-gray-300 
                      hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 font-medium 
                      text-sm px-4 py-2.5 rounded-lg shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>

                  {/* REPORT BUTTON */}
                  <button
                    onClick={() => setShow("flex")}
                    className="w-full text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium py-2 transition-colors duration-200"
                  >
                    Report User
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: RATE + TABLE */}
          <div className="flex-1 min-w-0">
            {/* RATE SECTION */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Rating</h2>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">(5.0)</span>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">My Recent Ads</h2>
              </div>

              <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 text-gray-700 sticky top-0 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Photo</th>
                        <th className="px-6 py-4 font-semibold">Title</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Price</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {api.map((element) => (
                        <tr
                          key={element.id}
                          className="bg-white hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4">
                            <img
                              src={element.images[0]}
                              alt="img"
                              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                            />
                          </td>

                          <td className="px-6 py-4 font-medium text-gray-900">
                            {element.title}
                          </td>
                          
                          <td className="px-6 py-4 text-gray-600 capitalize">
                            {element.category}
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                              ${element.price}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleEdit(element.id)}
                                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-150"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(element.id)}
                                className="text-red-600 hover:text-red-800 font-medium hover:underline transition-colors duration-150"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      {show === "flex" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Report User</h3>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Describe the reason for reporting..."
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShow("none")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Report submitted');
                  setShow("none");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}