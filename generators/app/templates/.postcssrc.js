// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem": {
      root_value: 64, // 设计图基准
      minPixelValue: 3,
      prop_white_list: []
    }
  }
}
