@echo off

REM
cd grpcserver
docker build -t grpcserver .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM
cd ..\nodeserver
docker build -t nodeserver .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM
cd ..\database
docker build -t ticketnoob_bd .
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%

REM 
docker-compose build
IF %ERRORLEVEL% NEQ 0 EXIT /B %ERRORLEVEL%
docker-compose up