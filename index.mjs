import git from 'simple-git';
import ora from 'ora';

async function performCommit() {
    const spinner = ora('Starting commit...').start();

    try {
        const message = await generateCommitMessage();
        spinner.text = 'Committing: ' + message;

        await git().add('./*');
        await git().commit(message);

        spinner.succeed('Done');
    } catch (error) {
        spinner.fail('Error: ' + error.message);
    }
}

async function generateCommitMessage() {
    return "feat: AI generated commit message";
}

performCommit();