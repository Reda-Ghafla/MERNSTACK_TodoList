// import { useEffect } from "react";

const Alert = ({alertText, setAlertMessage}) => {
  // setTimeout(() => closeAlert(false), 0)
  setTimeout(()=> setAlertMessage(false), 3000)
  // console.log(alertText);

  
  return <div className="alert">{<> {alertText} </>}</div>;
};

export default Alert;
