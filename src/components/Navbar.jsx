import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    // Clear user session data
    sessionStorage.removeItem('userId');
    
    // Redirect to the login page
    window.location.href = '/'; // Adjust this path as needed
  };

  return (
    <div>
      {/* Dark Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">ECOUNIT</a>

          {/* Navbar Toggler for Mobile (optional, for mobile responsiveness) */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto"> {/* Align items to the left */}
              <li className="nav-item active">
                <a className="nav-link text-white" href="/quiz">QUIZ <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/result">QUIZ RESULT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/survey">FEEDBACK FORM</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/surveyr">FEEDBACK RESULT</a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/map">MAP</a>
              </li>
            </ul>
            {/* Logout Button on the Right */}
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
