// // components/IncrementViewCount.tsx

// 'use client';

// import { useEffect, useRef } from 'react';

// interface IncrementViewCountProps {
//   id: string;
// }

// export default function IncrementViewCount({ id }: IncrementViewCountProps) {
//   const hasIncremented = useRef(false);

//   useEffect(() => {
//     if (!id || hasIncremented.current) return;

//     // Set hasIncremented to true before making the API call
//     hasIncremented.current = true;

//     const incrementViews = async () => {
//       try {
//         const response = await fetch(`/api/issue/increment-views/${id}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.message || 'Failed to increment view count');
//         }

//       } catch (error) {
//         console.error('Error incrementing view count:', error);

//         // Reset hasIncremented to false if there's an error
//         hasIncremented.current = false;
//       }
//     };

//     incrementViews();
//   }, [id]);

//   return null;
// }
