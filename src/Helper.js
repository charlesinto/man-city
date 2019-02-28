class Helper{
    
    static validateInputField(element){
        let error = [true, ''];
        if(element.validation.email){
            const valid = element.value.trim() === '';
             error = valid ? [false, 'This field is required'] : 
            ( (/\S+@\S+\.\S+/.test(element.value.trim())) ? error : [false, 'Must be a valid email']);
           
        }
        return error;
    }

    static onChange(formField, id, value){
        const formDetails = {...formField[id]}
        formDetails.value = value;
        const validData = this.validateInputField(formDetails);
        formDetails.valid = validData[0];
        formDetails.validationMessage = validData[1]
        return formDetails;
    }

    static validateForm(form){
        let objectToSubmit = {};
        let formIsValid = null;;
        for(let key in form){
            objectToSubmit[key] = form[key].value;
            if(formIsValid === null){
                formIsValid = form[key].valid;
            }
            else if( formIsValid){
                formIsValid = form[key].valid
            }
            
        }
        return { isValid: formIsValid, record: objectToSubmit }
    }

}

export default Helper;