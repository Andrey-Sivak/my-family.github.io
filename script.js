function checkValidate() {
    var form = $('form');

    $.each(form, function () {
        $(this).validate({
            ignore: [],
            errorClass: 'error',
            validClass: 'success',
            rules: {
                FullName: {
                    required: true
                },
                LName: {
                    required: true
                },
                FName: {
                    required: true
                },
                MName: {
                    required: true
                },
                email: {
                    required: true,
                    Email: true
                },
                phone: {
                    required: true,
                    PhoneNumber: true
                },
                select: {
                    required: true
                },
                Message: {
                    required: true
                },
                checkbox1: {
                    required: true
                },
                checkbox2: {
                    required: true
                },
                Password: {
                    required: true,
                    normalizer: function normalizer(value) {
                        return $.trim(value);
                    }
                }
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertBefore(element);
                }
            },
            messages: {
                PhoneNumber: 'Некорректный номер',
                Email: 'Некорректный e-mail'
            }
        });
    });
    jQuery.validator.addMethod('Email', function (value, element) {
        return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
    });
    jQuery.validator.addMethod('PhoneNumber', function (value, element) {
        return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
    });
}
checkValidate();