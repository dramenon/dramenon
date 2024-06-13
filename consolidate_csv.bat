@echo off
setlocal enabledelayedexpansion

:: Define the directory containing the CSV files
set "csvDir=Results"

:: Define the output consolidated CSV file
set "outputFile=consolidated.csv"

:: Remove the output file if it exists
if exist "%outputFile%" del "%outputFile%"

:: Add today's date as the first row
for /f "tokens=2 delims==" %%i in ('wmic os get localdatetime /value') do set datetime=%%i
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
echo %year%-%month%-%day% > "%outputFile%"

:: Add two blank rows
echo. >> "%outputFile%"
echo. >> "%outputFile%"

:: Initialize a flag to track if the header has been copied
set headerCopied=false

:: Loop through all CSV files in the directory
for %%f in ("%csvDir%\*.csv") do (
    echo Processing %%f
    if not !headerCopied! == true (
        :: Add the filename as a row
        echo %%~nxf >> "%outputFile%"
        :: Copy the header and content from the first file
        type "%%f" >> "%outputFile%"
        set headerCopied=true
    ) else (
        :: Add the filename as a row, skip the header (first line), and append the rest of the content with two blank rows in between
        echo %%~nxf >> "%outputFile%"
        more +1 "%%f" >> "%outputFile%"
    )
    :: Skip two rows
    echo. >> "%outputFile%"
    echo. >> "%outputFile%"
)

echo Consolidation complete. Output file: %outputFile%
endlocal

timeout /t 5 /nobreak
