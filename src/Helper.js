class Helper{
    
    static validate(element){
        let error = [true, ''];
        if(element.validation.email){
            const valid = element.value.trim() === '';
             error = valid ? [false, 'This field is required'] : 
            ( (/\S+@\S+\.\S+/.test(element.value.trim())) ? error : [false, 'Must be a valid email']);
           
        }
        return error;
    }
}

export default Helper;