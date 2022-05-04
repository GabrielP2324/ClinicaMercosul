let expressaoAMP = /\&/g, expressaoLT = /</g, expressaoGT = />/g;

function encode(x) {
	// Muito, muito importante trocar os caracteres < e > por &lt; e &gt; porque
	// se o dado da tabela tiver < >, o browser vai interpretar como uma tag HTML ;)
	return (x ? x.replace(expressaoAMP, "&amp;").replace(expressaoLT, "&lt;").replace(expressaoGT, "&gt;") : "");
}

function validateCNPJ(cnpj) {
	if (!cnpj || !(cnpj = cnpj.trim().replace(/\./g, "").replace(/\-/g, "").replace(/\//g, "")) || cnpj.length !== 14)
		return false;

	var i, sum = 0, modulus;

	for (i = 0; i < 12; i++)
		sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 4) ? 5 : 13) - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	if ((cnpj.charCodeAt(12) - 0x30) !== modulus)
		return false;

	sum = 0;
	for (i = 0; i < 13; i++)
		sum += (cnpj.charCodeAt(i) - 0x30) * (((i < 5) ? 6 : 14) - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	return ((cnpj.charCodeAt(13) - 0x30) === modulus);
}

function validateCPF(cpf) {
	if (!cpf || !(cpf = cpf.trim().replace(/\./g, "").replace(/\-/g, "")) || cpf.length !== 11)
		return false;

	var i, sum = 1, modulus = cpf.charCodeAt(0);

	for (i = 1; i < 9; i++) {
		if (cpf.charCodeAt(i) !== modulus) {
			sum = 0;
			break;
		}
	}
	if (sum)
		return false;

	sum = 0;
	for (i = 0; i < 9; i++)
		sum += (cpf.charCodeAt(i) - 0x30) * (10 - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	if ((cpf.charCodeAt(9) - 0x30) !== modulus)
		return false;

	sum = modulus * 2;
	for (i = 0; i < 9; i++)
		sum += (cpf.charCodeAt(i) - 0x30) * (11 - i);
	modulus = sum % 11;
	if (modulus < 2)
		modulus = 0;
	else
		modulus = 11 - modulus;

	return ((cpf.charCodeAt(10) - 0x30) === modulus);
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

$.validator.addMethod("cpf", function (value, element) {
	return (!value || validateCPF(value));
}, "Por favor, forneça um CPF válido.");
