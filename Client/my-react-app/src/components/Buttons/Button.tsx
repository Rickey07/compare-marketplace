import './button.css'

interface buttonProps {
    text:string,
    handleClick():void,
    isLoading?:boolean
}

const Button = ({text,handleClick,isLoading}:buttonProps) => {
  return (
    <div className="button-container">
        <button onClick={handleClick} disabled={isLoading}>{text}</button>
    </div>
  )
}

export default Button
