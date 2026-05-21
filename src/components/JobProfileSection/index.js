import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import JobsFilterGroup from '../JobsFilterGroup'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        rating: eachJob.rating,
        location: eachJob.location,
        title: eachJob.title,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, type],
      }),
      this.getJobDetails,
    )
  }

  renderSuccessView = () => {
    const {jobsList, searchInput} = this.state
    const jobDisplay = jobsList.length > 0

    return jobDisplay ? (
      <div className="details-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-item-details-container">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-desc">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-btn"
        type="button"
        data-testid="button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingview = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingview()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="job-details-container">
        <div className="render-group-items">
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            onChangeSearchInput={this.onChangeSearchInput}
            getJobDetails={this.getJobDetails}
          />
        </div>

        <div className="response-items">
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
