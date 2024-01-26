#!/usr/bin/env node
import git from 'simple-git';
import ora from 'ora';
import { gpt } from './lib/ai.mjs';

async function performCommit() {
    const spinner = ora('Generating commit message...').start();

    try {
        const status = await git().status();
        if (status.isClean() && status.not_added.length === 0) {
            throw new Error('Nothing to commit');
        }

        const message = await generateCommitMessage();
        spinner.text = `Committing:... "${message}"`;

        await git().add('./*');
        await git().commit(message);

        spinner.succeed("Committed: " + message);
    } catch (error) {
        spinner.fail('Error: ' + error.message);
    }
}

async function generateCommitMessage() {
    const diff = await git().diff(['--', ':!package-lock.json'])
    const diffStaged = await git().diff(['--staged', '--', ':!package-lock.json'])
    const combined = `${diff}\n${diffStaged}`
    const commitMessage = await gpt(systemPrompt, combined);
    console.log(combined)
    return commitMessage;
}

const systemPrompt = `
You are a git commit message generator.
You will be given a diff by the user, and you must generate a commit message based on that diff.
Output only a single line of text, with no formatting of any kind.
Do not add any explanations to the main commit message.
If you don't understand the context of the diff, print:
Changes to <filename>

Example 1:
Fix bug where users cannot log in

Example 2:
Add support for user avatars
`

performCommit();