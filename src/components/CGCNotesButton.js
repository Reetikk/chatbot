// import React, { useState } from 'react';

// const CGCNotesButton = ({ inNavbar = false, onCancel }) => {
//   const [showPopup, setShowPopup] = useState(false);

//   const handleRedirect = () => {
//     window.open('https://cgcstudyhub.in/', '_blank');
//     setShowPopup(false);
//   };

//   const handleCancel = () => {
//     setShowPopup(false);
//     if (onCancel) {
//       onCancel();
//     }
//   };

//   return (
//     <>
//       {/* Conditional Button Rendering */}
//       {inNavbar ? (
//         // Navbar Button
//         <button
//           onClick={() => setShowPopup(true)}
//           className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center space-x-1"
//         >
//           <span>📚</span>
//           <span className="hidden xl:inline">CGC Notes</span>
//         </button>
//       ) : (
//         // Floating Button
//         <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
//           <button
//             onClick={() => setShowPopup(true)}
//             className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm flex items-center space-x-2 animate-pulse"
//           >
//             <span>📚</span>
//             <span>CGC Notes</span>
//           </button>
//         </div>
//       )}

//       {/* Popup Modal */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 relative overflow-visible">
//             {/* Close Button */}
//             <button
//               onClick={handleCancel}
//               className="absolute -top-2 -right-2 w-12 h-12 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white shadow-lg z-50"
//               aria-label="Close popup"
//               style={{ zIndex: 9999 }}
//             >
//               <span className="text-2xl font-bold leading-none">×</span>
//             </button>
            
//             <div className="p-6">
//               {/* Header */}
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-2xl">📚</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                   CGC Study Hub
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-400 text-sm">
//                   Access comprehensive study materials and notes for CGC students
//                 </p>
//               </div>

//               {/* Features */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
//                     <span className="text-blue-600 dark:text-blue-400 text-sm">📝</span>
//                   </div>
//                   <span className="text-gray-700 dark:text-gray-300 text-sm">Complete study notes</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                     <span className="text-green-600 dark:text-green-400 text-sm">📊</span>
//                   </div>
//                   <span className="text-gray-700 dark:text-gray-300 text-sm">Previous year papers</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
//                     <span className="text-purple-600 dark:text-purple-400 text-sm">🎯</span>
//                   </div>
//                   <span className="text-gray-700 dark:text-gray-300 text-sm">Subject-wise resources</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-3">
//                 <button
//                   onClick={handleRedirect}
//                   className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
//                 >
//                   <span>🚀</span>
//                   <span>Visit CGC Study Hub</span>
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CGCNotesButton;
