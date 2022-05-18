let expressaoAMP = /\&/g, expressaoLT = /</g, expressaoGT = />/g;

function encode(x) {
	// Muito, muito importante trocar os caracteres < e > por &lt; e &gt; porque
	// se o dado da tabela tiver < >, o browser vai interpretar como uma tag HTML ;)
	return (x ? x.replace(expressaoAMP, "&amp;").replace(expressaoLT, "&lt;").replace(expressaoGT, "&gt;") : "");
}


function validateEmail(email) {
	if (!email || !(email = email.trim()))
		return false;

	var at = email.indexOf("@"),
		at2 = email.lastIndexOf("@"),
		dot = email.lastIndexOf(".");

	return (email.indexOf(":") < 0 && at > 0 && dot > (at + 1) && dot !== (email.length - 1) && at2 === at);
}

function resetForm(f) {
	var $form = $(f), i, validator;
	if (!$form || !$form.length)
		return;
	for (i = $form.length - 1; i >= 0; i--)
		$form[i].reset();
	$form.find("label.error").remove();
	$form.find(".error").removeClass("error");
	$form.find(".valid").removeClass("valid");
	validator = $form.validate();
	if (validator) {
		validator.resetForm();
		validator.formSubmitted = false;
	}
}

function maskMobilePhone(field) {
	var reg = /\D/g, behavior = function (val) {
		return ((val.replace(reg, "").length === 11) ? "(00) 00000-0000" : "(00) 0000-00009");
	}, opt = {
		onKeyPress: function (val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	$(field).mask(behavior, opt);
}


