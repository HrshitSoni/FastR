const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log("Extension is now working");

	const boldDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: 'bold'
	});

	const thinDecorationType = vscode.window.createTextEditorDecorationType({
		fontWeight: 'lighter', // Makes the text thinner
		opacity: '0.6' // Reduces the opacity for a thinner look
	});

	function applyDecorations(editor) {
		if (!editor) {
			return;
		}
		const text = editor.document.getText();
		const boldRegex = /\b(\w{1,3})/g; // Matches the first few letters to be bold
		const thinRegex = /\b(\w{4,})/g; // Matches the remaining letters to be thin

		let match;
		const boldDecorationArray = [];
		const thinDecorationArray = [];

		while ((match = boldRegex.exec(text)) !== null) {
			let startPos = editor.document.positionAt(match.index);
			let endPos = editor.document.positionAt(match.index + match[1].length);
			let decoration = { range: new vscode.Range(startPos, endPos) };
			boldDecorationArray.push(decoration);
		}

		while ((match = thinRegex.exec(text)) !== null) {
			let startPos = editor.document.positionAt(match.index + 3);
			let endPos = editor.document.positionAt(match.index + match[0].length);
			let decoration = { range: new vscode.Range(startPos, endPos) };
			thinDecorationArray.push(decoration);
		}

		editor.setDecorations(boldDecorationType, boldDecorationArray);
		editor.setDecorations(thinDecorationType, thinDecorationArray);
	}

	vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			applyDecorations(editor);
		}
	});

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			applyDecorations(editor);
		}
	});

	if (vscode.window.activeTextEditor) {
		applyDecorations(vscode.window.activeTextEditor);
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};


/*

*/