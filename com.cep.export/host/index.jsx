
function exportFile(type) {

	var filePath = app.activeDocument.fullName;
	var originalExtension = filePath.toString().split('.')[1];
  var folderPath = filePath.toString().split('/').slice(0,-1).join('/') + '/';
	var sanitizedFilePath = File(filePath).fsName;

	if (app.name == "Adobe Illustrator") {

		if (type == "pdf") {

			pdfSaveOptions = new PDFSaveOptions();
			pdfSaveOptions.optimization = true;
			app.activeDocument.saveAs(File(sanitizedFilePath), pdfSaveOptions);

		} else if (type == "jpg") {

			var exportOptions = new ExportOptionsJPEG();
		  exportOptions.blurAmount = 2;
		  exportOptions.matte = true;
		  exportOptions.qualitySetting = 100;
		  app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.JPEG, exportOptions);

		} else if (type == "png") {

			var exportOptions = new ExportOptionsPNG8();
		  exportOptions.matte = true;
		  app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.PNG8, exportOptions);

		};

	} else if (app.name == "Adobe Photoshop") {

    if (type == "pdf") {

			pdfSaveOptions = new PDFSaveOptions();
			pdfSaveOptions.embedColorProfile = true;
			pdfSaveOptions.optimizeForWeb = true;
			app.activeDocument.saveAs(File(sanitizedFilePath), pdfSaveOptions, true);

		} else if (type == "jpg") {

			jpgSaveOptions = new JPEGSaveOptions();
			jpgSaveOptions.embedColorProfile = true;
			jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
			jpgSaveOptions.matte = MatteType.NONE;
			jpgSaveOptions.quality = 1;
			app.activeDocument.saveAs(File(sanitizedFilePath), jpgSaveOptions, true);

		} else if (type == "png") {

			pngSaveOptions = new PNGSaveOptions();
			pngSaveOptions.compression = 2;
			app.activeDocument.saveAs(File(sanitizedFilePath), pngSaveOptions, true);

		} else {

		    var exportOptions = new ExportOptionsSaveForWeb();
		    exportOptions.quality = 60;
		    exportOptions.format = SaveDocumentType.JPEG;
		    exportOptions.includeProfile = true;
	    	app.activeDocument.exportDocument(File(sanitizedFilePath), ExportType.SAVEFORWEB, exportOptions);

		};

	} else if (app.name == "Adobe InDesign") {

		if (type == "pdf") {

			savePath = sanitizedFilePath.replace(originalExtension,"pdf");
			app.activeDocument.exportFile(ExportFormat.PDF_TYPE, File(savePath), false);

		} else if (type == "jpg") {

			savePath = sanitizedFilePath.replace(originalExtension,"jpeg");
			app.activeDocument.exportFile(ExportFormat.JPG, File(savePath), false);

		} else if (type == "png") {

			savePath = sanitizedFilePath.replace(originalExtension,"png");
			app.activeDocument.exportFile(ExportFormat.PNG_FORMAT, File(savePath), false);

		};
	};

	return folderPath;
};
