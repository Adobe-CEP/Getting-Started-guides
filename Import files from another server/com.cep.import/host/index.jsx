function displayFile(path) {
	if (app.name == "Adobe Photoshop") {
		var fileRef = new File(path)
		app.open(fileRef)
	}
}
