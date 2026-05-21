import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-img"
        />
        <div>
          <h1 className="similar-heading">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description">Description</h1>
      <p className="similar-item-description">{jobDescription}</p>
      <div className="location-container">
        <div className="job-location">
          <GoLocation className="location-icon" />
          <p className="location">{location}</p>
        </div>
        <div className="employ-type-container">
          <BsBriefcaseFill className="employ-type-icon" />
          <p className="employmentType">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
