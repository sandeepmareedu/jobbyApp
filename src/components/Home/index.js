import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => 
  (
    <div className="homeCon">
      <Header />
      <div className="homeImageCon">
        <div className="homeContentCon">
          <h1 className="homeHead">Find The Job That Fits Your Life</h1>
          <p className="homeDes">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="findJobs">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  )


export default Home
