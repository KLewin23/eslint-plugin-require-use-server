import requireUseServer from "./require-use-server";

const plugin = {
  meta: {
    name: "require-use-server",
    version: "1.0.9"
  },
  rules: {
    "require-use-server": requireUseServer,
  },
};

export default plugin