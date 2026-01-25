# Commit Staged Files

Commit the currently staged files following the Conventional Commits specification.

## Instructions

1. Run `git status` to see staged files
2. Run `git diff --cached` to see the staged changes
3. Analyze the changes and determine the appropriate commit type:
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `perf`: A code change that improves performance
   - `test`: Adding missing tests or correcting existing tests
   - `build`: Changes that affect the build system or external dependencies
   - `ci`: Changes to CI configuration files and scripts
   - `chore`: Other changes that don't modify src or test files

4. Create a commit message following this format:
   ```
   <type>(<optional scope>): <description>

   [optional body]
   ```

5. The description should:
   - Be in lowercase
   - Use imperative mood ("add feature" not "added feature")
   - Not end with a period
   - Be concise (50 chars or less for the first line)

6. If there are no staged files, inform the user and do not create a commit.

7. Use a HEREDOC to pass the commit message to ensure correct formatting:
   ```bash
   git commit -m "$(cat <<'EOF'
   type(scope): description
   EOF
   )"
   ```
