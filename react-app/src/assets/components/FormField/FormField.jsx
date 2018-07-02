import React from 'react'
import styles from './styles.scss'

const FormField = (props) => {
return (  <div className={styles.formField}>
    <label > {props.labelName} </label>
    <input type={props.inputType} name={props.valueName} />
  </div>
)}

export default FormField