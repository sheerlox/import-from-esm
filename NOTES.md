## Fuzzing

### Notes

- Jazzer.js cannot instrument ES modules correctly, so it needs to integrate with Jest
- we need to run Jest in watch mode, or else every line of fuzz output is eaten by Jest's status
- there seem to be a memory issue in the Jest integration of Jazzer.js. RSS was stable when running with its standalone version, but when using Jest it keeps stacking until reaching OOM
- the Jest integration is running way more slowly than the standalone version
- the corpus for the Jest test is located in `.cifuzz-corpus/fuzz.test/importFrom/`, and crashes are located in `tests/fuzzing/fuzz.test/importFrom/`
- using the `new FuzzedDataProvider(buffer).consumeString()` method seems more performant than `buffer.toString()` (~15%) (in standalone version, in Jest it's the opposite)

### Solution

Based on the above observations (difficulty, if not impossiblity, to implement fuzzing libraries for ESM packages) and choices made by [ossf/scorecard](https://github.com/ossf/scorecard), the "fuzzing" process is using the `fast-check` library.
