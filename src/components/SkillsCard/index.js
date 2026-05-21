import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-list-items">
      <div className="skills-container">
        <img src={imageUrl} alt={name} className="profile-img" />
        <p className="img-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard
