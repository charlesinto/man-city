import React from 'react';

const FormField = ({ formdata, id, onChange}) => {
    return(
        <div>
            {renderTemplate(formdata, id, onChange)}
            {renderError(formdata)}
        </div>
    )
}

const renderError = (formdata) => {
    return (
        <div className="error_label">
            {
                formdata.valid && formdata.validationMessage ? 
                null : formdata.validationMessage
            }
        </div>
    )
}

const renderTemplate = (formdata, id, onChange) => {
    let template = null;
    switch(formdata.element){
        case 'input':
         template = <div><input onChange={onChange} id={id} {...formdata.config} value={formdata.value} /></div>
            return template
         default:
            return template
    }
}

export { FormField };