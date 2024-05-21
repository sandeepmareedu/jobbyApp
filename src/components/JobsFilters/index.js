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

const JobsFilters = props => {
  const {onEmploymentType, onSalaryRange} = props

  const onClickEmploymentType = employmentTypeId => {
    onEmploymentType(employmentTypeId)
  }

  const onClickSalaryRange = salaryRange => {
    onSalaryRange(salaryRange)
  }

  const renderEmploymentListItems = () => {
    return employmentTypesList.map(each => (
      <li
        key={each.employmentTypeId}
        onChange={() => onClickEmploymentType(each.employmentTypeId)}
        className="employmentListItem"
      >
        <input
          className="employmentInput"
          id={each.employmentTypeId}
          type="checkbox"
        />
        <label className="label" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))
  }

  const renderSalaryRangesListItems = () => {
    return salaryRangesList.map(each => (
      <li
        key={each.salaryRangeId}
        onChange={() => onClickSalaryRange(each.salaryRangeId)}
        className="employmentListItem"
      >
        <input
          className="employmentInput"
          id={each.salaryRangeId}
          type="radio"
          name="salaryPackage"
        />
        <label className="label" htmlFor={each.salaryRangeId}>
          {each.label}
        </label>
      </li>
    ))
  }

  return (
    <div className="JobsFiltersCon">
      <div className="profileCon">
        <h1 className="profileName">Rahul Attuluri</h1>
        <p className="profileDes">
          Leader Software Developer and AI-ML expert.
        </p>
      </div>
      <hr className="line" />
      <ul className="employmentCon">
        <h1 className="typeOfEmployment">Type of Employment</h1>
        {renderEmploymentListItems()}
      </ul>
      <hr className="line" />
      <ul className="employmentCon">
        <h1 className="typeOfEmployment">Salary Range</h1>
        {renderSalaryRangesListItems()}
      </ul>
    </div>
  )
}
export default JobsFilters
