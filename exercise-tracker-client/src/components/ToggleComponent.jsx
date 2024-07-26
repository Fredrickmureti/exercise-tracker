import React, {useState} from "react";
import './ToggleComponent.css';

const ToggleCompoent = ({ComponentToToggle, iconSrc}) => {
  const [isVisible, setIsVisible] = useState(false);


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }



  return (
    <div className="toggle-component-container">
      <div className="icon-conatiner" onClick={toggleVisibility}>
        <img src={iconSrc} alt="Toggle-Icon" className="toggle-icon" />
      </div>

      {isVisible && (
        <div className="component-container">
          <ComponentToToggle />
        </div>
      )}
    </div>
  );
};


export default ToggleCompoent;