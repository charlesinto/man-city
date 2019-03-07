import React from 'react';

const FormField = ({ formdata, id, onChange}) => {
    return(
        <div>
            {
                formdata.showLabel ? <div className="label_inputs">{formdata.config.label}</div> : null
            }
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
        case 'select':
            template = <div><select onChange={onChange} id={id} {...formdata.config} value={formdata.value}>
                        <option value="">Select one</option>
                        {
                            formdata.config.options.map(item => (
                                <option key={item.key} value={item.value}>{item.value}</option>
                            ))
                        }
            </select></div>
            return template
         default:
            return template
    }
}

export { FormField };