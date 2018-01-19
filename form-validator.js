(function () {
    'use strict';

    let callback_options = {
        callback: initialize,
    };

    Object.assign(window.validator_options, callback_options);

    window.validator_options.callback();

})();

function initialize() {
    let forms = document.getElementsByClassName(window.validator_options.form_class);

    if (forms.length >= 1) {
        get_required_form_fields(forms);
    } else {
        throw new Error("There must be at least one form class to validate the form");
    }
}

function get_required_form_fields(forms) {
    for (let i = 0; i < forms.length; i++) {
        let form_field_elements = forms[i].querySelectorAll('[field-required]');
        let total_form_fields = form_field_elements.length;

        let form_options = {
            field_filled: false,
        };

        if (total_form_fields >= 1)
            enable_disable_form_submission.call(form_options, forms[i]);

        for (let j = 0; j < total_form_fields; j++) {
            var typingTimer;

            form_field_elements[j].addEventListener('focusout', function (evt) {
                evt.preventDefault();
                let element = evt.target;
                let field_current_value = element.value;
                let field_type = element.type;

                if (field_current_value == '') {
                    element.style.borderColor = "red";

                    let error_message = get_error_message(field_type);

                    generate_error_message(forms[i], element, error_message);
                } else {
                    element.style.borderColor = "";

                    remove_error_message(element);

                    //let error_message = '';

                    switch (field_type) {
                        case "number":
                            var is_num = /^\d+$/.test(field_current_value);
                            if (!is_num) {
                                let error_message = window.validator_options.confirm_number_message;
                                generate_error_message(forms[i], element, error_message);
                            } else {
                                check_validation_done.call(form_options, forms[i], form_field_elements);
                            }
                            break;
                        case "email":
                            let is_email = validate_email(field_current_value);
                            if (!is_email) {
                                let error_message = window.validator_options.confirm_email_message;
                                generate_error_message(forms[i], element, error_message);
                            } else {
                                check_validation_done.call(form_options, forms[i], form_field_elements);
                            }
                            break;
                        case "url":
                            let is_url = validate_URL(field_current_value);
                            if (!is_url) {
                                let error_message = window.validator_options.confirm_url_message;
                                generate_error_message(forms[i], element, error_message);
                            } else {
                                check_validation_done.call(form_options, forms[i], form_field_elements);
                            }
                            break;
                        case "password":
                            let processed_message = process_password_error(form_field_elements, field_current_value);
                            if (processed_message == 'do-nothing') {

                            } else if (processed_message == 'no-error') {
                                check_validation_done.call(form_options, forms[i], form_field_elements);
                            } else {
                                let confirm_password_field_element = processed_message;
                                let error_message = validator_options.confirm_password_message;
                                generate_error_message(forms[i], confirm_password_field_element, error_message);
                            }
                            break;
                        default:
                            check_validation_done.call(form_options, forms[i], form_field_elements);
                    }
                }

                clearInterval(typingTimer);
            });

            form_field_elements[j].addEventListener('focus', function (evt) {
                typingTimer = setInterval(function () {
                    let element = evt.target;
                    let field_current_value = element.value;
                    let field_type = element.type;

                    if (field_current_value == '') {
                        element.style.borderColor = "red";

                        let error_message = get_error_message(field_type);

                        generate_error_message(forms[i], element, error_message);
                    } else {
                        element.style.borderColor = "";

                        remove_error_message(element);

                        //let error_message = '';

                        switch (field_type) {
                            case "number":
                                var is_num = /^\d+$/.test(field_current_value);
                                if (!is_num) {
                                    let error_message = window.validator_options.confirm_number_message;
                                    generate_error_message(forms[i], element, error_message);
                                } else {
                                    check_validation_done.call(form_options, forms[i], form_field_elements);
                                }
                                break;
                            case "email":
                                let is_email = validate_email(field_current_value);
                                if (!is_email) {
                                    let error_message = window.validator_options.confirm_email_message;
                                    generate_error_message(forms[i], element, error_message);
                                } else {
                                    check_validation_done.call(form_options, forms[i], form_field_elements);
                                }
                                break;
                            case "url":
                                let is_url = validate_URL(field_current_value);
                                if (!is_url) {
                                    let error_message = window.validator_options.confirm_url_message;
                                    generate_error_message(forms[i], element, error_message);
                                } else {
                                    check_validation_done.call(form_options, forms[i], form_field_elements);
                                }
                                break;
                            case "password":
                                let processed_message = process_password_error(form_field_elements, field_current_value);
                                if (processed_message == 'do-nothing') {

                                } else if (processed_message == 'no-error') {
                                    check_validation_done.call(form_options, forms[i], form_field_elements);
                                } else {
                                    let confirm_password_field_element = processed_message;
                                    let error_message = validator_options.confirm_password_message;
                                    generate_error_message(forms[i], confirm_password_field_element, error_message);
                                }
                                break;
                            default:
                                check_validation_done.call(form_options, forms[i], form_field_elements);
                        }
                    }
                    console.log('testing');
                }, 200);
            });
        }
    }
}

function check_validation_done(form_element, form_field_elements) {
    if (form_field_elements.length > 0) {
        let flag = true;

        for (let i = 0; i < form_field_elements.length; i++) {
            let field_current_value = form_field_elements[i].value;
            let field_type = form_field_elements[i].type;

            switch (field_type) {
                case "text":
                    if (field_current_value == '') {
                        flag = false;
                    }
                    break;
                case "number":
                    if (field_current_value == '') {
                        flag = false;
                    }
                    break;
                case "email":
                    if (field_current_value == '') {
                        flag = false;
                    }
                    break;
                case "url":
                    if (field_current_value == '') {
                        flag = false;
                    }
                    break;
                case "password":
                    if (field_current_value == '') {
                        flag = false;
                    }
                    break;
                default:
                    if (field_current_value == '') {
                        flag = false;
                    }
            }
        }

        if (flag === true) {
            this.field_filled = true;
            enable_disable_form_submission.call(this, form_element, form_field_elements);
        }
    }
}

function get_error_message(field_type) {
    let error_message = '';

    switch (field_type) {
        case "text":
            error_message = validator_options.text_message;
            break;
        case "number":
            error_message = validator_options.number_message;
            break;
        case "email":
            error_message = validator_options.email_message;
            break;
        case "url":
            error_message = validator_options.url_message;
            break;
        case "password":
            error_message = validator_options.password_message;
            break;
        default:
            error_message = validator_options.default_message;
    }

    return error_message;
}

function process_password_error(form_field_elements, field_current_value) {
    let password_fields_array = new Array();
    if (form_field_elements.length > 0) {
        for (let i = 0; i < form_field_elements.length; i++) {
            if (form_field_elements[i].type.toLowerCase() == 'password') {
                password_fields_array.push(form_field_elements[i]);
            }
        }
    }

    if (password_fields_array.length > 1) {
        let password_value = password_fields_array[0].value;
        let confirm_password_value = password_fields_array[1].value;

        if (password_value.length <= 0 || confirm_password_value.length <= 0) {
            return 'do-nothing';
        }

        if (password_value == confirm_password_value) {
            return 'no-error';
        } else {
            return password_fields_array[1];
        }
    }
}

function validate_URL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!pattern.test(url)) {
        return false;
    } else {
        return true;
    }
}

function validate_email(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function remove_error_message(form_field_element) {
    let error_message_elements = form_field_element.parentNode.getElementsByClassName('error-message');

    if (error_message_elements.length > 0) {
        for (let i = 0; i < error_message_elements.length; i++) {
            error_message_elements[i].parentNode.removeChild(error_message_elements[i]);
        }
    }
}

function generate_error_message(form_element, form_field_element, error_message) {
    let error_message_elements = form_field_element.parentNode.getElementsByClassName('error-message');

    if (error_message_elements.length == 0) {
        let error_div = document.createElement("div");
        error_div.className = 'error-message';
        let error_para = document.createElement("p");
        error_para.style.color = 'red';
        let error_node = document.createTextNode(error_message);
        error_para.appendChild(error_node);
        error_div.appendChild(error_para);

        form_field_element.parentNode.insertBefore(error_div, form_field_element.nextSibling);
    }

    disable_form_submission(form_element);
}

function disable_form_submission(form_element) {
    let form_submit_button_element = form_element.querySelector('[type=submit]');

    form_submit_button_element.disabled = true;

    form_element.addEventListener("submit", form_submit_event, true);
}

function enable_disable_form_submission(form_element) {
    let form_filled_flag = this.field_filled;

    let form_submit_button_element = form_element.querySelector('[type=submit]');

    if (form_filled_flag == false) {
        form_submit_button_element.disabled = true;
    } else {
        form_submit_button_element.disabled = false;
    }

    if (form_filled_flag == false) {
        form_element.addEventListener("submit", form_submit_event, true);
    } else {
        form_element.removeEventListener("submit", form_submit_event, true);
    }
}

function form_submit_event(e) {
    e.preventDefault();
}