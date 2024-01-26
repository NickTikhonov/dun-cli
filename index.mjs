import git from 'simple-git';
import ora from 'ora';
import { gpt } from './lib/ai.mjs';

async function performCommit() {
    const spinner = ora('Generating commit message...').start();

    try {
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
    const diff = await git().diff(['--', ':!*.json'])
    const diffStaged = await git().diff(['--staged', '--', ':!*.json'])
    const combined = `${diff}\n${diffStaged}`
    const commitMessage = await gpt(systemPrompt, combined);
    return commitMessage;
}

const systemPrompt = `
You are a git commit message generator.
You will be given a diff by the user, and you must generate a commit message based on that diff.
Output only a single line of text, with no formatting of any kind.

Example 1:
Fix bug where users cannot log in

Example 2:
Add support for user avatars
`

performCommit();