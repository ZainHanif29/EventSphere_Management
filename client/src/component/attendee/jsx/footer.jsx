import React from 'react';

const Footer = () => {
const year = new Date().getFullYear();
  return (
    <div className="container-fuild mt-1">
      <footer className="text-white text-center text-lg-start bg-dark">
        {/* Grid container */}
        <div className=" p-4">
          {/* Grid row */}
          <div className="row mt-4">
            {/* Grid column */}
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About company</h5>

              <p>
              EventSphere Management is a pioneer in the realm of event management, specializing in the orchestration of large-scale expos and trade shows spanning various industries.
              </p>

              <p>
              Recognizing the inherent challenges in traditional expo management processes, we embarked on a journey to redefine the expo experience.
              </p>

    
            </div>
            {/* Grid column */}

            {/* Grid column */}

            {/* Grid column */}

            {/* Grid column */}
            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Opening hours</h5>

              <table className="table text-center text-white">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © {year} Copyright &nbsp;
          <span className="text-white">EventSphere Management</span>
        </div>
        {/* Copyright */}
      </footer>
    </div>
    /* End of .container */
  );
};

export default Footer;
