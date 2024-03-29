import test from 'ava';
import {runAppleScript, runAppleScriptSync, execAppleScript, execAppleScriptSync} from './index.js';

test('spawn async', async t => {
	t.is(await runAppleScript('return "unicorn"'), 'unicorn');
});

test('spawn sync', t => {
	t.is(runAppleScriptSync('return "unicorn"'), 'unicorn');
});

test('spawn async - non-human readable output', async t => {
	t.is(await runAppleScript('return "unicorn"', {humanReadableOutput: false}), '"unicorn"');
});

test('spawn sync - non-human readable output', t => {
	t.is(runAppleScriptSync('return "unicorn"', {humanReadableOutput: false}), '"unicorn"');
});

test('spawn async - non-human readable output (arrays)', async t => {
	t.is(await runAppleScript('return {"unicorn"}', {humanReadableOutput: false}), '{"unicorn"}');
});

test('spawn sync - non-human readable output (arrays)', t => {
	t.is(runAppleScriptSync('return {"unicorn"}', {humanReadableOutput: false}), '{"unicorn"}');
});

test('exec async', async t => {
	t.is(await execAppleScript('return "unicorn"', {exec: true}), 'unicorn');
});

test('exec sync', t => {
	t.is(execAppleScriptSync('return "unicorn"', {exec: true}), 'unicorn');
});
