import React from 'react';
import './login.css'
export const FormErrors = ({formErrors}) =>
  <div className = 'formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName.toUpperCase()} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>