// import React from 'react';
// import { Link } from 'react-router-dom';

// function NavbarComp() {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">Navbar</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Registration</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/l">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/f">Forgot Password</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/c">Change Password</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/user">User Table</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/u">Logged User</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavbarComp;
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarComp() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">EventSphere Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/forgot-password">Forgot Password</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/change-password">Change Password</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">User Table</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Logged User</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComp;

