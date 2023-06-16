import './button.css'

interface buttonProps {
    text:string,
    handleClick():void
}

const Button = ({text,handleClick}:buttonProps) => {
  return (
    <div className="button-container">
        <button onClick={handleClick}>{text}</button>
    </div>
  )
}

export default Button
