const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/assets/sass/utils/antd.customize.less",
        ),
      },
      path: "src/pages/teacher",
    },
  ],
};
