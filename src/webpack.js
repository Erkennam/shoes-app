const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Ваш главный файл входа
  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
    filename: 'bundle.js' // Имя выходного файла
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Расширения файлов для разрешения
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Обрабатываем файлы с расширением .js и .jsx
        exclude: /node_modules/, // Исключаем папку node_modules из обработки
        use: {
          loader: 'babel-loader', // Используем babel-loader для транспиляции JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Подключаем пресеты для Babel
          }
        }
      },
      {
        test: /\.css$/, // Обрабатываем файлы с расширением .css
        use: ['style-loader', 'css-loader'] // Используем style-loader и css-loader для загрузки CSS
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Путь к HTML файлу шаблона
      filename: 'index.html' // Имя файла HTML, который будет создан после сборки
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Папка для отслеживания изменений и автоматической перезагрузки
    port: 3000 // Порт для dev-сервера
  }
};
