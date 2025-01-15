// // components/Views.tsx
// import Ping from "./Ping";
// import { client } from "@/sanity/lib/client";
// import { EXPERIENCE_VIEWS_QUERY } from "@/sanity/lib/queries";

// export default async function View({ id }: { id: string }) {
//   if (!id) {
//     return null;
//   }

//   // Fetch the views
//   const { views: totalViews = 0 } = await client
//     .withConfig({ useCdn: false })
//     .fetch(EXPERIENCE_VIEWS_QUERY, { id });

//   return (
//     <div className="view-container">
//       <div className="absolute -top-2 -right-2">
//         <Ping />
//       </div>
//       <p className="view-text">
//         <span className="font-black">Views: {totalViews}</span>
//       </p>
//     </div>
//   );
// }
