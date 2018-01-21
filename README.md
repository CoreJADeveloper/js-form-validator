# js-form-validator
## A lightweight Javascript library to validate form.

Here are some simple instructions to use the library -

Use following Javascript code to initialize form to validate HTML Form fields -

```
(function () {
        window.validator_options = {
            form_class: 'form-validator',
            default_message: '* Please enter information',
            text_message: '* Please enter text',
            number_message: '* Please enter number',
            confirm_number_message: '* Please enter only number',
            email_message: '* Please enter email address',
            confirm_email_message: '* Please enter valid email address',
            password_message: '* Please enter password',
            confirm_password_message: '* Password does not match',
            url_message: '* Please enter url',
            confirm_url_message: '* Please enter only url',
        };
    })();
  ```
`form_class` Object key takes `HTML Form` class name. For example, 

```
<form class='form-validator'>
</form>
```

You can use multiple Forms's as much as you wish just by adding the Form class name. The library would automatically figure out the field type and generates error messages accordingly.

For validate a specific field just add a field attribute `field-required` -

```
<input type="text" class="form-control" name="firstname" field-required value="">
```

Also, you can edit error messages as you wish.

