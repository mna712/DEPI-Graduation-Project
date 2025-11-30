// import React, { useState } from 'react'

function Report({ display ,setDisplay}) {


  return (
<>
  {/* Overlay */}
  <div 
    className="fixed inset-0 bg-black/30" 
    style={{display: display}} 
  />

  {/* Modal Center Wrapper */}
  <div 
    style={{display: display ,marginTop:"150px"}} 
    className="fixed inset-0 flex items-center justify-center z-10 px-4"
  >
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-md w-full">

      {/* Header */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Report</h3>

        <button 
          onClick={()=>{setDisplay("none")}} 
          type="button" 
          aria-label="Close" 
          className="text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form className="px-6 py-5 space-y-4">

        {/* Radio buttons */}
        <fieldset className="space-y-2">
          <legend className="sr-only">Reason</legend>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="spam" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" defaultChecked />
            <span>Spam</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="fraud" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" />
            <span>Fraud</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="profile" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" />
            <span>Inappropriate profile picture</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="threat" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" />
            <span>This user is threatening me</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="insult" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" />
            <span>This user is insulting me</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="radio" name="reason" value="other" className="mt-1 rounded-full text-teal-500 focus:ring-teal-400" />
            <span>Other</span>
          </label>
        </fieldset>

        {/* Comment box */}
        <div>
          <textarea
            rows={4}
            placeholder="Comment"
            className="w-full resize-none border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>

        {/* Upload Photo */}
        <label 
          htmlFor="upload" 
          className="block border border-gray-200 rounded-md py-4 px-3 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" 
              viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="1.5" d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M8 11l2 2 3-3 4 4" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <div className="font-medium">Upload Photo</div>
              <div className="text-xs text-gray-400">Optional</div>
            </div>
          </div>
          <input id="upload" type="file" accept="image/*" className="hidden" />
        </label>

        {/* Block user */}
        <label className="flex items-center gap-3 text-sm text-gray-600">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-400" />
          <span>I also want to block this user</span>
        </label>

        {/* Send Report */}
        <button 
          type="submit" 
          className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-90" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Send Report
        </button>

      </form>

    </div>
  </div>

</>
  )
}

export default Report