import React from 'react'

function Alert(props) {
  const captilise=(str)=>
  {
    if(str==='danger')
    str='error';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() +"!";
  }
  return (
   
    <div style={{height:'50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} srole="alert">
  <strong>{captilise(props.alert.type)}</strong> {props.alert.msg}
  </div>}
</div>
   
  )
}

export default Alert