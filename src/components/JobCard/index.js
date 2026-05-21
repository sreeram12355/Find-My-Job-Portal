import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobcard-list-items">
        <div className="job-items-container">
          <div className="logo-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-justify"
            />
            <div className="title-container">
              <h1 className="company-title-head">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="count-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="location-desc">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="location-logo-brief" />
                <p className="location-desc">{employmentType}</p>
              </div>
            </div>
            <p className="package-desc">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1 className="jobcard-description">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
