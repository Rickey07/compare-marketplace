import { createPortal } from "react-dom";
import loaderImage from '../../assets/loader.gif';
import './loader.css'

interface propTypes {
  visible: boolean;
}

const Loader = ({ visible }: propTypes) => {
  return visible ? <>
    {
        createPortal(
            <div className="loader-container">
                <img src={loaderImage} alt={"loader-image"} height={120} width={120}/>
                <div className="loader-text">
                    Good Things Takes Time...
                </div>
            </div>,
            document.getElementById("portal-loader") as HTMLElement
        )
    }
  </>:null
};

export default Loader;
