# Commit All Files

Commit ALL files (staged and unstaged) from git status, creating multiple logical commits following Conventional Commits.

## Instructions

1. Run `git status` to see all modified, added, and untracked files
2. Run `git diff` to see unstaged changes
3. Run `git diff --cached` to see staged changes (if any)

4. Analyze ALL changes and group them logically by:
   - Feature/functionality area
   - Type of change (feat, fix, refactor, etc.)
   - Related files that should be committed together

5. For each logical group, create a separate commit:
   - Stage only the files for that group with `git add <files>`
   - Create a commit with appropriate conventional commit message
   - Repeat for next group

6. Commit types:
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `perf`: A code change that improves performance
   - `test`: Adding missing tests or correcting existing tests
   - `build`: Changes that affect the build system or external dependencies
   - `ci`: Changes to CI configuration files and scripts
   - `chore`: Other changes that don't modify src or test files

7. Commit message format:
   ```
   <type>(<optional scope>): <description>
   ```
   - Description in lowercase, imperative mood, no period at end
   - Concise (50 chars or less)

8. Use HEREDOC for commit messages:
   ```bash
   git add <files> && git commit -m "$(cat <<'EOF'
   type(scope): description
   EOF
   )"
   ```

9. If there are no changes at all, inform the user.

10. At the end, run `git log --oneline -n <number of commits created>` to show the user what was committed.
