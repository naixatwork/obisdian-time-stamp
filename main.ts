import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {
		console.log('onload')
	}
	onunload() {

	}
}
