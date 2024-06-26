import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/User/Landing/Landing";
// import { Login } from "./pages/User/Login/Login";

// Test
// import {
//   HomeProcessAdmin,
//   HomeSysAdmin,
//   HomeUser,
//   Landing,
//   Votar,
// } from "./pages/test";
// import { useState } from "react";
// import { ProtectedRoute } from "./routes/ProtectedRoute";
// interface UserTemp {
//   id: number;
//   name: string;
//   role: string | "user" | "process" | "system";
// }

function App() {
  // Test setup
  // const [user, setuser] = useState<UserTemp | null>(null);

  // const login = (role: string) => {
  //   setuser({
  //     id: 1,
  //     name: "Juanito Perez",
  //     role,
  //   });
  //   console.log(role);
  // };
  // const logout = () => {
  //   setuser(null);
  // };

  return (
    // Testing routes to test pages
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    // Protected routes - Official
    // <BrowserRouter>
    //   <Navigation />
    //   {user ? (
    //     <button onClick={logout}>Logout</button>
    //   ) : (
    //     <>
    //       <button onClick={() => login("user")}>Login as User</button>
    //       <button onClick={() => login("process")}>
    //         Login as Process Admin
    //       </button>
    //       <button onClick={() => login("system")}>Login as System Admin</button>
    //     </>
    //   )}
    //   <Routes>
    //     <Route index element={<Landing />} />
    //     <Route path="/landing" element={<Landing />} />
    //     <Route
    //       element={
    //         <ProtectedRoute
    //           children={null}
    //           isAuthenticated={!!user && user.role == "user"}
    //         />
    //       }
    //     >
    //       <Route path="home-user" element={<HomeUser />} />
    //       <Route path="votar" element={<Votar />} />
    //     </Route>
    //     <Route
    //       path="/process"
    //       element={
    //         <ProtectedRoute isAuthenticated={!!user && user.role == "process"}>
    //           <HomeProcessAdmin />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route
    //       path="/system"
    //       element={
    //         <ProtectedRoute isAuthenticated={!!user && user.role == "system"}>
    //           <HomeSysAdmin />
    //         </ProtectedRoute>
    //       }
    //     />
    //   </Routes>
    // </BrowserRouter>
  );
}
// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/landing">Landing</Link>
//         </li>
//         <li>
//           <Link to="/home-user">Home User</Link>
//         </li>
//         <li>
//           <Link to="/votar">Votar</Link>
//         </li>
//         <li>
//           <Link to="/process">Process Admin</Link>
//         </li>
//         <li>
//           <Link to="/system">System Admin</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default App;
