function addTextLayer(text) {
    const layers = app.activeDocument.artLayers;
    const layer = layers.add();
    layer.kind = LayerKind.TEXT;

    const textItem = layer.textItem;
    textItem.kind = TextType.PARAGRAPHTEXT;
    textItem.size = 24;
    textItem.position = [10, 10];
    textItem.contents = text;
    textItem.width = new UnitValue('500 pixels');
    textItem.height = new UnitValue('500 pixels');
}
