function generateURL(info){
	var qr = new JSQR();
	var input = new qr.Input();
	input.dataType = input.DATA_TYPE.URL;
	input.data = {
		"url": info
	};

	return input;
};
function generate(info) {
	var qr = new JSQR();
	var code = new qr.Code();

	code.encodeMode = code.ENCODE_MODE.UTF8_SIGNATURE;
	code.version = code.DEFAULT;
	code.errorCorrection = code.ERROR_CORRECTION.H;

	var input;

	input = generateURL(info);

	var matrix = new qr.Matrix(input, code);
	matrix.scale = 4;
	matrix.margin = 2;

	var canvas = document.createElement("canvas");
	canvas.setAttribute('width', matrix.pixelWidth);
	canvas.setAttribute('height', matrix.pixelWidth);
	canvas.getContext('2d').fillStyle = 'rgb(0,0,0)';
	matrix.draw(canvas, 0, 0);
	return canvas;
};

function generateVCARD(form){
	var array = jQuery(form).serializeArray();
	var lastName = "";
	var firstName = "";
	var email = "";
	var phone = "";
	jQuery.each(array, function() {
		if(this.name == "lastName"){
			lastName += this.value;
		}
		else if(this.name == "firstName"){
			firstName += this.value;
		}
		else if(this.name == "email"){
			email += this.value;
		}
		else if(this.name == "phone"){
			phone += this.value;
		}
	});
	var vc = "BEGIN:VCARD\nVERSION:3.0\n";
	vc += "N:" + lastName + ";" + firstName + "\n";
	vc += "FN:" + firstName + "\n";
	vc += "EMAIL:" + email + "\n";
	vc += "TEL;TYPE=HOME:+" + phone + "\n";
	vc += "END:VCARD";

	vc = encodeURIComponent(vc);

	var image = document.createElement("img")
	image.setAttribute('src', "http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=" + vc);
	return image;
}

function generateVCARD(width, height, lastName, firstName, email, phone){
	var vc = "BEGIN:VCARD\nVERSION:3.0\n";
	vc += "N:" + lastName + ";" + firstName + "\n";
	vc += "FN:" + firstName + "\n";
	vc += "EMAIL:" + email + "\n";
	vc += "TEL;TYPE=HOME:" + phone + "\n";
	vc += "END:VCARD";
	vc = encodeURIComponent(vc);
	var image = document.createElement("img")
	image.setAttribute('src', "http://chart.apis.google.com/chart?cht=qr&chs=" + width + "x" + height + "&chl=" + vc);
	return image;
}