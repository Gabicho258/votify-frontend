import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Landing } from "./pages/User/Landing/Landing";
import { Login } from "./pages/User/Login/Login";
import { Register } from "./pages/User/Register/Register";

// Administrator login
import { LoginAdmin } from "./pages/Admin/Login/LoginAdmin";

// System administrator views
import { SystemModules } from "./pages/Admin/System/SystemModules/SystemModules";
import { ProcessRequests } from "./pages/Admin/System/ProcessRequests/ProcessRequests";
import { ProcessRequest } from "./pages/Admin/System/ProcessRequest/ProcessRequest";
import { ManagementElectionAdmin } from "./pages/Admin/System/ManagementElectionAdmin/ManagementElectionAdmin";
import { Mailbox } from "./pages/Admin/Mailbox/Mailbox";
import { ElectoralProcessAdmin } from "./pages/Admin/System/ElectoralProcessAdmin/ElectoralProcessAdmin";

// Process administrator views
import { ProcessModules } from "./pages/Admin/Process/ProcessModules/ProcessModules";
import { ProcessListAdmin } from "./pages/Admin/Process/ProcessListAdmin/ProcessListAdmin";
import { ProcessInfoForm } from "./pages/Admin/Process/ProcessInfoForm/ProcessInfoForm";
import { ProcessCreateLists } from "./pages/Admin/Process/ProcessCreateLists/ProcessCreateLists";
import { ProcessAddVoter } from "./pages/Admin/Process/ProcessAddVoter/ProcessAddVoter";
import { ProcessInfoAdmin } from "./pages/Admin/Process/ProcessInfoAdmin/ProcessInfoAdmin";

// User routes
import { ProcessHelp } from "./pages/User/ProcessHelp/ProcessHelp";
import { Credential } from "./pages/User/Credential/Credential";
import { ProcessList } from "./pages/User/ProcessList/ProcessList";
import { Hub } from "./pages/User/Hub/Hub";
import { InProgressProcessInfo } from "./pages/User/InProgressProcessInfo/InProgressProcessInfo";
import { VotesSummary } from "./pages/User/VotesSummary/VotesSummary";
import { ProcessInfo } from "./pages/User/ProcessInfo/ProcessInfo";
import { useGetUserByIdQuery } from "./app/votify.api";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Page404 } from "./pages/Page404/Page404";
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
  const userDataStorage = localStorage.getItem("voter_id") || "";
  const adminDataStorage = localStorage.getItem("admin_id") || "";

  const { data: userLogged, isLoading: isLoadingUser } =
    useGetUserByIdQuery(userDataStorage);
  const { data: adminLogged, isLoading: isLoadingAdmin } =
    useGetUserByIdQuery(adminDataStorage);
  // console.log(user);
  const isUserAuthenticated = !!userLogged;
  const isAdminAuthenticated = !!adminLogged;

  return (
    // Testing routes to test pages
    <BrowserRouter>
      <Routes>
        {/* //        User Routes                */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/end-register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute
              isLoading={isLoadingUser}
              children={null}
              isAuthenticated={isUserAuthenticated}
              redirectTo="/login"
            />
          }
        >
          <Route path="/process-list" element={<ProcessList />} />
          <Route path="/process-help" element={<ProcessHelp />} />
          <Route path="/credential" element={<Credential />} />
          <Route path="/hub" element={<Hub />} />
          <Route
            path="/in-progress-process-info/:process_id"
            element={<InProgressProcessInfo />}
          />
          <Route path="/votes-summary" element={<VotesSummary />} />
          <Route path="/process-info/:process_id" element={<ProcessInfo />} />
        </Route>
        {/*       ADMIN ROUTES             */}
        <Route path="/login-admin" element={<LoginAdmin />} />

        <Route
          element={
            <ProtectedRoute
              isLoading={isLoadingAdmin}
              isAuthenticated={isAdminAuthenticated}
              redirectTo="/login-admin"
            />
          }
        >
          <Route path="/mailbox" element={<Mailbox />} />
        </Route>

        {/* SYS_ADMIN  */}
        <Route
          element={
            <ProtectedRoute
              isLoading={isLoadingAdmin}
              isAuthenticated={
                isAdminAuthenticated && adminLogged.role === "sys_admin"
              }
              children={null}
              redirectTo="/login-admin"
            />
          }
        >
          <Route path="/system-admin-modules" element={<SystemModules />} />
          <Route path="/process-requests" element={<ProcessRequests />} />
          <Route
            path="/process-admin-management"
            element={<ManagementElectionAdmin />}
          />
          <Route
            path="/electoral-process-administration"
            element={<ElectoralProcessAdmin />}
          />

          <Route
            path="/process-request/:process_id"
            element={<ProcessRequest />}
          />
        </Route>

        {/* PROCESS_ADMIN  */}
        <Route
          element={
            <ProtectedRoute
              isLoading={isLoadingAdmin}
              isAuthenticated={
                isAdminAuthenticated && adminLogged.role === "process_admin"
              }
              children={null}
              redirectTo="/login-admin"
            />
          }
        >
          <Route path="/process-admin-modules" element={<ProcessModules />} />
          <Route path="/process-list-admin" element={<ProcessListAdmin />} />
          <Route path="/process-info-form" element={<ProcessInfoForm />} />
          <Route
            path="/process-create-lists"
            element={<ProcessCreateLists />}
          />
          <Route path="/process-add-voter" element={<ProcessAddVoter />} />
          <Route
            path="/process-info-admin/:process_id"
            element={<ProcessInfoAdmin />}
          />
        </Route>

        <Route path="*" element={<Page404 />} />
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
