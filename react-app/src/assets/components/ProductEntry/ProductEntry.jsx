import React from 'react'
import FormField from '../FormField/FormField'
import styles from './styles';
const ProductEntry = (props) => {
  return (
    <div className={styles.productEntry}>
      <FormField name="IdField" inputType="text" labelName="Product Id" />
      <FormField name="NameField" inputType="text" labelName="Product Name" />
      <FormField name="ShortDescriptionField" inputType="text" labelName="Short Description" />
    </div>
  )
}

export default ProductEntry