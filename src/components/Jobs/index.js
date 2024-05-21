import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobsFilters from '../JobsFilters'

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiConstants.initial,
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  onEmploymentType = employmentTypeId => {
    this.setState(
      prev => ({
        employmentType: [...prev.employmentType, employmentTypeId],
      }),
      this.getJobs,
    )
  }

  onSalaryRange = salaryRange => {
    this.setState(
      {
        salaryRange,
      },
      this.getJobs,
    )
  }

  onChangeInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  getJobs = async () => {
    const {searchInput, employmentType, salaryRange} = this.state
    this.setState({
      apiStatus: apiConstants.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        apiStatus: apiConstants.success,
      })
      console.log(data)
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderJobsView = () => {
    return <div></div>
  }

  renderFailureView = () => {
    return (
      <div>
        <h1 style={{color: 'Red'}}>failure</h1>
      </div>
    )
  }

  renderLoaderView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inprogress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobsView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobsMainCon">
          <div className="jobsCon">
            <JobsFilters
              onEmploymentType={this.onEmploymentType}
              onSalaryRange={this.onSalaryRange}
            />
            <div className="jobsSubCon">
              <div className="inputCon">
                <input
                  className="searchInput"
                  type="text"
                  value={searchInput}
                  onChange={this.onChangeInput}
                  onKeyDown={this.onEnter}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="searchBtn"
                  onClick={this.getJobs}
                >
                  <BsSearch className="searchIcon" aria-label="search" />
                </button>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
