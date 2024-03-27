import process from 'node:process';
import { spawn } from 'node:child_process';

export async function runAppleScript(script, { humanReadableOutput = true } = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];
	const child = spawn('osascript', ['-e', script, ...outputArguments]);

	return new Promise((resolve, reject) => {
		let stdout = '';
		child.stdout.on('data', (data) => {
			stdout += data.toString();
		});

		child.on('error', (err) => reject(err));

		child.on('close', (code) => {
			if (code !== 0) {
				reject(new Error(`AppleScript exited with code ${code}`));
			} else {
				resolve(stdout.trim());
			}
		});
	});
}

export function runAppleScriptSync(script, { humanReadableOutput = true } = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];
	const child = spawn('osascript', ['-e', script, ...outputArguments], {
		stdio: ['ignore', 'pipe', 'ignore'] // Assuming stderr is not important
	});

	let stdout = '';
	child.stdout.on('data', (data) => {
		stdout += data.toString();
	});

	child.on('error', (err) => {
		throw err; // Rethrow the error
	});

	child.on('close', (code) => {
		if (code !== 0) {
			throw new Error(`AppleScript exited with code ${code}`);
		}
	});

	return stdout.trim();
}
