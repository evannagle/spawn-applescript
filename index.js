import process from 'node:process';
import {spawn, spawnSync, execFile, execFileSync} from 'node:child_process';
import {promisify} from 'node:util';

const execFileAsync = promisify(execFile);

export async function runAppleScript(script, {humanReadableOutput = true} = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];
	const child = spawn('osascript', ['-e', script, ...outputArguments]);

	return new Promise((resolve, reject) => {
		let stdout = '';
		child.stdout.on('data', data => {
			stdout += data.toString();
		});

		child.on('error', error => reject(error));

		child.on('close', code => {
			if (code === 0) {
				resolve(stdout.trim());
			} else {
				reject(new Error(`AppleScript exited with code ${code}`));
			}
		});
	});
}

export function runAppleScriptSync(script, {humanReadableOutput = true} = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];

	const result = spawnSync('osascript', ['-e', script, ...outputArguments], {
		stdio: ['ignore', 'pipe', 'ignore'],
	});

	if (result.status !== 0) {
		throw new Error(`AppleScript exited with code ${result.status}: ${result.stderr.toString()}`);
	}

	return result.stdout.toString().trim();
}

export async function execAppleScript(script, {humanReadableOutput = true} = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];

	const {stdout} = await execFileAsync('osascript', ['-e', script, outputArguments]);
	return stdout.trim();
}

export function execAppleScriptSync(script, {humanReadableOutput = true} = {}) {
	if (process.platform !== 'darwin') {
		throw new Error('macOS only');
	}

	const outputArguments = humanReadableOutput ? [] : ['-ss'];

	const stdout = execFileSync('osascript', ['-e', script, ...outputArguments], {
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'ignore'],
		timeout: 500,
	});

	return stdout.trim();
}
