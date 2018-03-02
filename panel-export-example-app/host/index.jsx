
function exportFile(type) {
	var filePath = app.activeDocument.fullName
	var splitted = filePath.toString().split('.')
	var originalExtension = splitted[splitted.length-1] 
    var sanitizedFilePath = File(filePath).fsName;
	if (app.name == "Adobe Illustrator") {
    	if (type == "pdf"){
			finalPath = sanitizedFilePath.replace(originalExtension,"pdf");
			pdfFile = new File(finalPath)
			pdfSaveOptions = new PDFSaveOptions()
			pdfSaveOptions.optimization = true
			app.activeDocument.saveAs(pdfFile, pdfSaveOptions);
		} else if (type == "jpg"){
			finalPath = sanitizedFilePath.replace(originalExtension,"jpeg");
			var exportOptions = new ExportOptionsJPEG();
		    exportOptions.blurAmount = 2;
		    exportOptions.matte = true;
		    exportOptions.qualitySetting = 100;
		    app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.JPEG, exportOptions);
		} else if (type == "png"){
			finalPath = sanitizedFilePath.replace(originalExtension,"png");
			var exportOptions = new ExportOptionsPNG8();
		    exportOptions.matte = true;
		    app.activeDocument.exportFile(File(sanitizedFilePath), ExportType.PNG8, exportOptions);
		} else {
	    	finalPath = sanitizedFilePath;
		}
		return finalPath
	} else if (app.name == "Adobe Photoshop"){
    	if (type == "pdf"){
			finalPath = sanitizedFilePath.replace(originalExtension,"pdf");
			pdfFile = new File(finalPath)
			pdfSaveOptions = new PDFSaveOptions()
			pdfSaveOptions.embedColorProfile = true
			pdfSaveOptions.optimizeForWeb = true
			app.activeDocument.saveAs(pdfFile, pdfSaveOptions, true);
		} else if (type == "jpg"){
			finalPath = sanitizedFilePath.replace(originalExtension,"jpeg")
			jpgFile = new File(finalPath)
			jpgSaveOptions = new JPEGSaveOptions()
			jpgSaveOptions.embedColorProfile = true
			jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE
			jpgSaveOptions.matte = MatteType.NONE
			jpgSaveOptions.quality = 1
			app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true);
		} else if (type == "png"){
			finalPath = sanitizedFilePath.replace(originalExtension,"png")
			pngFile = new File(finalPath)
			pngSaveOptions = new PNGSaveOptions()
			pngSaveOptions.compression = 2
			pngSaveOptions.interlaced = true
			app.activeDocument.saveAs(pngFile, pngSaveOptions, true);
		} else {
		    var exportOptions = new ExportOptionsSaveForWeb();
		    exportOptions.quality = 60;
		    exportOptions.format = SaveDocumentType.JPEG;
		    exportOptions.includeProfile = true;
	    	app.activeDocument.exportDocument(File(sanitizedFilePath), ExportType.SAVEFORWEB, exportOptions);
	    	finalPath = sanitizedFilePath;
		}
		return finalPath
	} 
	else if (app.name == "Adobe InDesign"){
		if (type == "pdf"){
			finalPath = sanitizedFilePath.replace(originalExtension,"pdf");
			app.activeDocument.exportFile(ExportFormat.PDF_TYPE, File(finalPath), false);
		} else if (type == "jpg"){
			finalPath = sanitizedFilePath.replace(originalExtension,"jpeg");
			app.activeDocument.exportFile(ExportFormat.JPG, File(finalPath), false);
		} else if (type == "png"){
			finalPath = sanitizedFilePath.replace(originalExtension,"png");
			app.activeDocument.exportFile(ExportFormat.PNG_FORMAT, File(finalPath), false);
		} else {
			finalPath = sanitizedFilePath
		}
		return finalPath
	}
}