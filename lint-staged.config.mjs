export default {
  "*": (filenames) => [`eslint ${filenames.join(" ")} --fix`, "git add"],
};
