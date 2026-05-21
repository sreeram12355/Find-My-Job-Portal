import ProfileDetails from '../ProfileDetails'
import './index.css'

const JobsFilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const getEmploymentTypeList = () =>
    employmentTypesList.map(eachEmploy => {
      const onChangeEmployType = event => {
        changeEmploymentType(event.target.value)
      }

      return (
        <li className="checkbox-list-items" key={eachEmploy.employmentTypeId}>
          <input
            type="checkbox"
            className="check-radio"
            id={eachEmploy.employmentTypeId}
            value={eachEmploy.employmentTypeId}
            onChange={onChangeEmployType}
          />
          <label htmlFor={eachEmploy.employmentTypeId} className="check-label">
            {eachEmploy.label}
          </label>
        </li>
      )
    })

  const getSalaryRangeList = () =>
    salaryRangesList.map(salary => {
      const onChangeSalaryRange = () => {
        changeSalaryRange(salary.salaryRangeId)
      }

      return (
        <li className="checkbox-list-items" key={salary.salaryRangeId}>
          <input
            type="radio"
            className="check-radio"
            id={salary.salaryRangeId}
            name="salary"
            value={salary.salaryRangeId}
            onChange={onChangeSalaryRange}
          />
          <label htmlFor={salary.salaryRangeId} className="check-label">
            {salary.label}
          </label>
        </li>
      )
    })

  return (
    <div className="job-filter-container">
      <ProfileDetails />
      <hr className="horizontal-line" />

      <div className="employment-container">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-type-container">{getEmploymentTypeList()}</ul>
      </div>

      <hr className="horizontal-line" />

      <div className="employment-container">
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="employment-type-container">{getSalaryRangeList()}</ul>
      </div>
    </div>
  )
}

export default JobsFilterGroup
