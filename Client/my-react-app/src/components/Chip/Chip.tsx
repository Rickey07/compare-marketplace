import './Chip.css'
interface propTypes  {
    text:string,
    handleClick():void
}

const Chip = ({text,handleClick}:propTypes) => {
  return (
    <div onClick={handleClick} className={"main-chip"}>
        {text}
    </div>
  )
}

export default Chip
