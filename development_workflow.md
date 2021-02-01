# Development workflow

When submitting code or documentation changes please follow these steps to have bigger chances of getting your piece of work merged into the master branch.

**Note:** Before writing a new piece of code please make sure that the thing you want to fix/add can't be simulated using [the built-in Developer mode](quickstart.md#enable-developer-mode-inside-the-application) or isn't explained in [Mudita Center Wiki](https://github.com/mudita/mudita-center/wiki).

## Create a new branch

Create a branch, which name is connected to the feature, bug fix, or documentation change you want to contribute e.g. `feature/some-feature` or `fix/some-fix`.

**Note:** If you're part of the Mudita Center core development team, please precede the branch name with a relevant Jira ticket number e.g. `EGD-5555-some-feature`.

## Commit changes

Try to commit your changes in small batches. Others need to be able to see a full list of changes and maybe cherry-pick one of your commits. The general rule is to commit „one thing” per commit described in a meaningful way.

**GOOD:** „Tests for input component”, „Select added to storybook”, „Modal - UI component”, „Link formatting helper added”

**BAD:** „fixes”, „CR fixes”, „link” - they are not meaningful, „general UI components” - sounds like there are many things inside like a few components

Here's [a helpful article about writing good Git commit messages](https://chris.beams.io/posts/git-commit/).

### Force Pushing

If your PR is in the code review process it’s not good to force push it - it’s a change of commits history. You're not obligated to forget about `git push -f`, but use it only on private branches that are waiting to be reviewed. Otherwise it breaks the tracking mechanism and may lead to review duplication.

## Perform self-checks

Before requesting a code review from your colleagues, you need to make some self-checks. It’s important to avoid simple code issues which can be easily eliminated so that the reviewer will need to spend less time on your Pull Request :muscle:

What you should do:

- Review your code - remember to review your own code. Sometimes a console.log is left in code after debugging or some code is left commented. You can find such issues yourself and fix them immediately. Always wonder about your code, maybe there's something you can improve and show reviewers an amazing piece of code with no issues to fix.

- Include tests - all new code (components, hooks) should have dedicated tests. If your PR contains a fixed bug, then you should probably fix the tests too. This check means that you took care of the tests related to the code you've changed.

- Attach descriptions and screenshots - not only a description is needed in the PR. Screenshots are also helpful to get an overview of the implemented part without opening a preview, or to find the changed/implemented part on a preview faster.

## Create and describe your Pull Request

Each PR should contain a short description. It should be brief and mention important changes which were implemented in your PR. Include all important details, e.g. specific problems fixed by a specific piece of code. This is needed to avoid unnecessary questions during Code Review and to shorten the whole process.

In Mudita Center PR template you should identify spaces for “self-checks” which help you include all the helpful information for reviewers. See the next section for more details about it.

### Pull Request status - didn’t finish? Create a draft PR!

Remember to push your code continuously. A draft PR might be helpful. We're using it to create a PR „work in progress” - to show somebody a piece of code or a deploy preview.

When the code is ready, you simply click a „Ready for review” button.

## Request code review

If you’re creating a PR (not a draft), then reviewers are usually requested automatically by the project’s configuration (`.github/auto_assign.yml` file). If not - add reviewers in the PR's “Reviewers” section onb GitHub.

**Note:** Comment with a mention of somebody is not a review request, but it doesn’t mean you can’t mention a reviewer in a comment. You can do it, if you want to ensure they will read something or you just want an answer for a question you asked. It means the mention is not a “review request”, so the reviewer knows they don’t have to spend time reviewing your code once again.

## Comments from reviewers

### Should I change everything that was requested?

The general rule is: you can, but you don’t have to. If a reviewer found a bug in your code, then you should fix it. If somebody requests a change, which seems not good enough for you, you can ask for argumentation or give some different point of view. Feel free to challenge the reviewer's opinion and present your point.

### Fixes

If you agree with a mentioned issue and you want to fix it, remember to make it easy to verify.

### Commit per fix

It’s not good to implement all fixes and commit them in a one commit named “Code Review fixes”, because it’s hard for the reviewer to verify all of them together and it’s not consistent with committing rules.

E.g. if somebody requests to fix a typo in your function name, then fix it and commit as “Typo of function name fixed” (or something similar).

### Links to fixes in threads

Name of the commit might not be enough. Imagine 50 fixes to your code and a reviewer trying to find a commit related to a comment while verifying if it’s resolved or not. It will be easier for a reviewer to have a link to a commit with a related fix in a thread. It will be helpful for you too, because you will see what you fixed and what you heven’t yet.

### Request a re-review

If all fixes are done remember to request a re-review from a reviewer. You should do it the same way as requesting a review for the first time.

### Resolving conversation

"Resolve conversation” button should be clicked by the comment author after concluding about the discussed topic (e.g. when an expected fix is applied or there is a convincing con-argument).

## FAQ

### What is more important - preparing a new PR or code reviewing?

It’s really important to remember the priority of finishing open PRs. The main motivation is making tasks “DONE”. You should always try to do re-reviews as soon as possible, because they can usually be done faster than doing a review of a new piece of code. If there are new PRs on the list, it’s better to review them before adding next ones.

### Should I use “code suggestions”?

If it’s helpful for you - yes, you should. In some cases it’s easier to add a strict code suggestion than writing a comment with a change proposition. The main advantage of this way is less time spent on committing a fix by an author, because the only thing to do is a click on a button.

**Note:** The committed suggestion should be always validated whether it doesn’t cause any issue, (e.g. fails of type checking). Please bear that in mind.

### Can I use integration branches?

No, you should avoid using integration branches. It's because they usually cause big merges to the master branch, which can be dangerous even if every part of the code has been reviewed and tested earlier.

The best practice is to merge as small part of the code as it's possible.
