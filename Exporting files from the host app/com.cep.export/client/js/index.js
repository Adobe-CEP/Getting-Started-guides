/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
  CSInterface
*/
var csInterface = new CSInterface();

/*
  UI Elements
*/
var buttonGroup = document.querySelector("#button-group");
var pdfButton = document.querySelector("#export-pdf");
var jpgButton = document.querySelector("#export-jpg");
var pngButton = document.querySelector("#export-png");
var originalButton = document.querySelector("#export-original");

/*
  Event listeners
*/
pdfButton.addEventListener('click', function(){exportWithType('pdf');}, false);
jpgButton.addEventListener('click', function(){exportWithType('jpg');}, false);
pngButton.addEventListener('click', function(){exportWithType('png');}, false);
originalButton.addEventListener('click', function(){exportWithType();}, false);

function exportWithType(type) {
	csInterface.evalScript(`exportFile("${type}")`, function(path) {
		alert("file saved at " + path);
	});
}
