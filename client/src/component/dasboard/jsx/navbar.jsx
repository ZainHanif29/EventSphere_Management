import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import { Link } from 'react-router-dom';

function Nav() {
  const Show = ()=>{
      document.getElementById("nav-wrapper").style.display = "block";
      document.getElementById("button").style.display = "none";
  }
  const Hide = ()=>{
    document.getElementById("nav-wrapper").style.display = "none";
    document.getElementById("button").style.display = "block";

}
  return(
    <> 
    <div id='button'  onClick={Show}> ||| </div>
    <div id="nav-wrapper">
    <div id='button2'   onClick={Hide}> ||| </div>

       <nav className='navarea'>
         <ul className='listcontiner'>
         <Link type="button" className="listitems" id='link' to="/viewusers">
         VIEW USER
       </Link>
       <Link type="button" className="listitems" id='link' to="/viewevents">
         VIEW EVENTS
       </Link>
       <Link type="button" className="listitems" id='link' to="/viewbooth">
         VIEW BOOTH
       </Link>
       <Link type="button" className="listitems" id='link' to="/createevent">
         CREATE EVENTS
       </Link>
       <Link type="button" className="listitems" id='link' to="/analysis">
       ANALYSIS REPORT
       </Link>
         </ul>
       </nav>
       
    </div>
    </>
      
  )
}

export default Nav;
