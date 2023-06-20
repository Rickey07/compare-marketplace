import './Chip.css'
interface propTypes  {
    text:string,
    handleClick(text:string):void,
    isActive?:boolean
}

const Chip = ({text,handleClick,isActive}:propTypes) => {
  return (
    <div onClick={ () => handleClick(text)} className={ isActive?"main-chip active-chip" : "main-chip"}>
        <span className='chip-text'>{text}</span>
    </div>
  )
}

export default Chip
