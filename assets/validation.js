(function () {

    // validation code
    function validate_forms() {
        let button = $("[data-submit]");
        let email = $(".ced_email");
        let name = $(".ced_name");
        let last_name = $('.ced_last_name');
        let password = $('.ced_password');
        let phone = $(".ced_phone");
        let email_error = $(".ced_email_error");
        let name_error = $(".ced_name_error");
        let last_name_error = $('.ced_last_name_error');
        let password_error = $('.ced_password_error');
        let phone_error = $(".ced_phone_error");

        button.attr('disabled', 'disabled');

        if (email != null) {
            email.on('input blur focus', function () {
                validate_details(email_error, 'email', button);
            })
        }
        if (name != null) {
            name.on('input blur focus', function () {
                validate_details(name_error, 'name', button);
            })
        }
        if (last_name != null) {
            last_name.on('input blur focus', function () {
                validate_details(last_name_error, 'last_name', button);
            })
        }
        if (phone != null) {
            phone.on('input blur focus', function () {
                validate_details(phone_error, 'phone', button);
            })
        }
        if (password != null) {
            password.on('input blur focus', function () {
                validate_details(password_error, 'password', button);
            })
        }
    }
    function validate_details(error_span, type, button) {

        if (type == "email") {
            email = $('.ced_email').val();

            if (email == '') {
                error_span.text('**Email Cannot be Blank')
                $('.ced_email').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || email.match(/^[0-9]/)) {
                error_span.text('**Invalid Email format')
                $('.ced_email').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else {
                error_span.text('')
                $('.ced_email').attr('data-status', true);
                check_status(button);
            }
        }
        if (type == "name") {
            name = $('.ced_name').val();
            if (name == '') {
                error_span.text('**Name cannot be blank')
                $('.ced_name').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (!name.match(/^[A-Za-z\s\-]+$/)) {
                if (name.length == 1)
                    $('.ced_name').val("");
                else {
                    var new_name = name.slice(0, -1);
                    $('.ced_name').val(new_name);
                }
                setTimeout(function () {
                    error_span.text('')
                    validate_details(error_span, 'name');
                }, 3000)
                error_span.text('**Name cannot contain numbers or special characters')
                $('.ced_name').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (name.length < 3) {
                error_span.text('**Name cannot be less than 3 characters')
                $('.ced_name').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else {
                error_span.text('')
                $('.ced_name').attr('data-status', true);
                check_status(button);
            }
        }
        if (type == "last_name") {
            last_name = $('.ced_last_name').val();
            if (last_name == '') {
                error_span.text('')
                $('.ced_last_name').attr('data-status', true);
                check_status(button);
            }
            else if (!last_name.match(/^[A-Za-z\s\-]+$/)) {
                if (last_name.length == 1)
                    $('.ced_last_name').val("");
                else {
                    var new_name = last_name.slice(0, -1);
                    $('.ced_last_name').val(new_name);
                }
                setTimeout(function () {
                    error_span.text('')
                    validate_details(last_name_error, 'last_name');
                }, 3000)
                error_span.text('**Last name should contain only alphabets')
                $('.ced_last_name').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else {
                error_span.text('')
                $('.ced_last_name').attr('data-status', true);
                check_status(button);
            }
        }
        if (type == "phone") {
            phone = $('.ced_phone').val();
            if (phone == '') {
                error_span.text('**Phone Number cannot be blank');
                $('.ced_phone').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (phone.length == 1 && phone == '0') {
                $('.ced_phone').val("");
                error_span.text('**Phone Number cannot begin with 0')
                $('.ced_phone').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (!phone.match(/^[0-9]+$/)) {
                if (phone.length == 1 && phone != "0")
                    $('.ced_phone').val("");
                else {
                    var new_phone = phone.slice(0, -1);
                    $('.ced_phone').val(new_phone);
                }
                error_span.text('**Phone number cannot contain alphabets or special characters')
                setTimeout(function () {
                    error_span.text('')
                    validate_details(error_span, 'phone');
                }, 3000)
                $('.ced_phone').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (phone.length < 10) {
                error_span.text('**Phone number cannot be less than 10 digits')
                $('.ced_phone').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (phone.length > 10) {
                var new_phone = phone.slice(0, -1);
                $('.ced_phone').val(new_phone);
                error_span.text('**Phone number cannot be more than 10 digits')
                setTimeout(function () {
                    error_span.text('')
                    validate_details(error_span, 'phone');
                }, 3000)
                $('.ced_phone').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else {
                error_span.text('')
                $('.ced_phone').attr('data-status', true);
                check_status(button);
            }
        }
        if (type == "password") {
            password = $('.ced_password').val();
            if (password == '') {
                error_span.text('**Password Cannot be Blank')
                $('.ced_password').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else if (password.length < 5) {
                error_span.text('**Password cannot be less than 5 characters')
                $('.ced_password').attr('data-status', false);
                button.attr('disabled', 'disabled');
            }
            else {
                error_span.text('')
                $('.ced_password').attr('data-status', true);
                check_status(button);
            }
        }
    }

    function check_status(button) {
        var status = { name_status: '', last_name_status: '', email_status: '', phone_status: '', password_status: '' };
        if ($('.ced_name') != null || $('.ced_name') != undefined) {
            status.name_status = $('.ced_name').attr('data-status');
        }
        if ($('.ced_last_name') != null || $('.ced_last_name') != undefined) {
            status.last_name_status = $('.ced_last_name').attr('data-status');
        }
        if ($('.ced_email') != null || $('.ced_email') != undefined) {
            status.email_status = $('.ced_email').attr('data-status');
        }
        if ($('.ced_phone') != null || $('.ced_phone') != undefined) {
            status.phone_status = $('.ced_phone').attr('data-status');
        }
        if ($('.ced_password') != null || $('.ced_password') != undefined) {
            status.password_status = $('.ced_password').attr('data-status');
        }
        var count = 0, true_status = 0;
        for (individual_status in status) {

            if (status[individual_status] != null || status[individual_status] != undefined) {
                count += 1;
                if (status[individual_status] == 'true')
                    true_status += 1;
            }
        }
        if (count == true_status)
            button.removeAttr('disabled');
    }

    validate_forms();

    //recover form
    function validate_recover_form() {
        let buttons_rec = $("[data-submit-rec]");
        let email_rec = $(".ced_email_rec");
        let email_error_rec = $(".ced_email_rec_error");
        buttons_rec.attr('disabled', 'disabled');

        if (email_rec != null) {
            email_rec.on('input blur focus', function () {
                validate_rec(email_error_rec, 'email', buttons_rec);
            })
        }

        function validate_rec(error_span, type, buttons_rec) {

            if (type == "email") {
                email_rec = $('.ced_email_rec').val();
                if (email_rec == '') {
                    error_span.text('**Email Cannot be Blank')
                    $('.ced_email_rec').attr('data-status', false);
                    buttons_rec.attr('disabled', 'disabled');
                }
                else if (!email_rec.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || email_rec.match(/^[0-9]/)) {
                    error_span.text('**Invalid Email format')
                    $('.ced_email_rec').attr('data-status', false);
                    buttons_rec.attr('disabled', 'disabled');
                }
                else {
                    error_span.text('')
                    $('.ced_email_rec').attr('data-status', true);
                    check_rec(buttons_rec);
                }
            }
        }
        function check_rec(buttons_rec) {
            var status = { email_status: '' };
            if ($('.ced_email_rec') != null || $('.ced_email_rec') != undefined) {
                status.email_status = $('.ced_email_rec').attr('data-status');
            }
            var count = 0, true_status = 0;
            for (individual_status in status) {

                if (status[individual_status] != null || status[individual_status] != undefined) {
                    count += 1;
                    if (status[individual_status] == 'true')
                        true_status += 1;
                }
            }
            if (count == true_status)
                buttons_rec.removeAttr('disabled');
        }
    }

    validate_recover_form();



})();