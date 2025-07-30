@echo off

REM Для запуска локального сервера сайта
REM Используется Node.js и http-server

REM Полное обновление сайта CTRL + F5
start "" "http://localhost:8080"
npx http-server -c-1