// // app/auth/signin/page.tsx
// 'use client'

// import { signIn } from 'next-auth/react'
// import { useState } from 'react'

// export default function SignIn() {
//   const [email, setEmail] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       await signIn('email', {
//         email,
//         callbackUrl: '/',
//       })
//     } catch (error) {
//       console.error('Sign in error:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center">
//       <div className="w-full max-w-md space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
//             >
//               {isLoading ? 'Signing in...' : 'Sign in with Email'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }