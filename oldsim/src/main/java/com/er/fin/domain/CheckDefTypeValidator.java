package com.er.fin.domain;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CheckDefTypeValidator implements ConstraintValidator<CheckDefType, DefItem> {

    private CheckDefType value;

    public CheckDefTypeValidator() {
    }

    public void initialize(CheckDefType value) {
        this.value = value;
    }

    @Override
    public boolean isValid(DefItem item, ConstraintValidatorContext constraintValidatorContext) {
        if (item==null || item.getType()==null){
            return true;
        } else {
            boolean isValid = item.getType().getCode().name().equals(value.value().name());
            return isValid;
        }
    }

}
