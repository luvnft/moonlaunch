// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {  Globe } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { TokenData } from "@/types/app/token";


// export function TokenInfo() {
//   const token: any = [{
//     image:"https://replicate.delivery/pbxt/HzjMKjJttfUyb6xtwsfps1SLsANZDemXLzknLZOBYZsnaOjnA/out-0.png",
//     name:"Pepe",
//     description:"Pepe to the moonnn",
//     ticker:"PEPE",
//     marketCap:"1.2 Mil",
//     holders:"33345",
//     priceData:+52,
//     telegram:"",
//     website:""
//   }]
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center space-x-4">
//         <img
//           src={token[0].image}
//           alt={token[0].name}
//           className="w-16 h-16 rounded-full"
//         />
//         <div className="flex-1">
//           <CardTitle className="text-2xl">{token[0].name}</CardTitle>
//           <p className="text-muted-foreground">${token[0].ticker}</p>
//         </div>
//         <div className="flex space-x-2">
//           <a
//             href={token[0].website}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-primary"
//           >
//             <Globe className="h-5 w-5" />
//           </a>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <div>
//             <p className="text-muted-foreground">Price</p>
//             <p className="text-xl font-bold">${token[0].price}</p>
//           </div>
//           {/* <div>
//             <p className="text-muted-foreground">24h Change</p>
//             <p className={`text-xl font-bold ${token[0].change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
//               {token[0].change}
//             </p>
//           </div> */}
//           <div>
//             <p className="text-muted-foreground">Market Cap</p>
//             <p className="text-xl font-bold">${token[0].marketCap}</p>
//           </div>
//           <div>
//             <p className="text-muted-foreground">Holders</p>
//             <p className="text-xl font-bold">{token[0].holders}</p>
//           </div>
//         </div>
//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={token[0].priceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="hsl(var(--primary))"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">About {token[0].name}</h3>
//           <p className="text-muted-foreground">{token[0].description}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }