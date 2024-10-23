// 'use client'

// import React, { useEffect, useState } from 'react';
// import { SignInButton } from "@clerk/nextjs";
// import Image from 'next/image';

// const WelcomeBackPage = () => {
//   const [isReturningUser, setIsReturningUser] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
//     if (hasVisitedBefore) {
//       setIsReturningUser(true);
//     } else {
//       localStorage.setItem('hasVisitedBefore', 'true');
//     }
//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-grow relative">
//         <Image
//           src="/main.jpg"
//           alt="Welcome Back Image"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>
//       <div className="p-4 bg-white dark:bg-gray-800">
//         {isClient && (
//           <>
//             <h1 className="text-2xl font-bold mb-4 text-center">
//               {isReturningUser ? "Welcome back!" : "Welcome!"}
//             </h1>
//             <SignInButton mode="modal">
//               <button className="w-full bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full">
//                 {isReturningUser ? "Sign In" : "Get Started"}
//               </button>
//             </SignInButton>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WelcomeBackPage;