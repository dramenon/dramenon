@echo off
title Shut down Processes for Game Night!

echo Goodbye processes!

TASKKILL /F /T /IM "Adobe Desktop Service.exe" >nul 2>&1
TASKKILL /F /T /IM "Creative Cloud.exe" >nul 2>&1
TASKKILL /F /T /IM "Creative Cloud Helper.exe" >nul 2>&1
TASKKILL /F /T /IM "CoreSync.exe" >nul 2>&1
TASKKILL /F /T /IM "CreativeCloudSet-Up.exe" >nul 2>&1
SLEEP 2 >nul 2>&1

TASKKILL /F /T /IM "Adobe Crash Processor.exe" >nul 2>&1
TASKKILL /F /T /IM "CCXProcess.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeCollabSync.exe" >nul 2>&1
TASKKILL /F /T /IM "Adobe CEF Helper.exe" >nul 2>&1
TASKKILL /F /T /IM "CCLibrary.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeNotificationHelper.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeNotificationClient.exe" >nul 2>&1
TASKKILL /F /T /IM "acrotray.exe" >nul 2>&1
TASKKILL /F /T /IM "AcrobatNotificationClient.exe" >nul 2>&1
TASKKILL /F /T /IM "Adobe Spaces Helper.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeIPCBroker.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeGCClient.exe" >nul 2>&1
TASKKILL /F /T /IM "AdobeExtensionsService.exe" >nul 2>&1
TASKKILL /F /T /IM  "AdobeARM.exe" >nul 2>&1
TASKKILL /F /T /IM  "AdobeARMHelper.exe" >nul 2>&1
TASKKILL /F /T /IM  "armsvc.exe" >nul 2>&1
TASKKILL /F /T /IM  "AdobeCollabSync.exe" >nul 2>&1
TASKKILL /F /T /IM  "CreativeCloudSet-Up.exe" >nul 2>&1

NET STOP "AdobeUpdateService"
NET STOP "AGSService"
NET STOP "AGMService"
NET STOP "AdobeIPCBroker.exe" 

TASKKILL /F /T /IM  "msedge.exe" >nul 2>&1

TASKKILL /F /T /IM  "WacomDesktopCenter.exe" >nul 2>&1
TASKKILL /F /T /IM  "Wacom_UpdateUtil.exe" >nul 2>&1

TASKKILL /F /T /IM  "node.exe" >nul 2>&1
TASKKILL /F /T /IM  "dynamiclinkmanager.exe" >nul 2>&1
TASKKILL /F /T /IM  "CEPHtmlEngine.exe" >nul 2>&1

TASKKILL /F /T /IM  "OriginWebHelperService.exe" >nul 2>&1

TASKKILL /F /T /IM  "SteamService.exe" >nul 2>&1
TASKKILL /F /T /IM  "steam.exe" >nul 2>&1
TASKKILL /F /T /IM  "steamwebhelper.exe" >nul 2>&1
TASKKILL /F /T /IM  "steamwebhelper.exe"  /F

TASKKILL /F /T /IM  "YourPhone.exe" >nul 2>&1
TASKKILL /F /T /IM  "DbxSvc.exe" >nul 2>&1
TASKKILL /F /T /IM  "Dropbox.exe" >nul 2>&1
TASKKILL /F /T /IM  "DropboxUpdate.exe" >nul 2>&1

TASKKILL /F /T /IM  "EpicGamesLauncher.exe" >nul 2>&1
TASKKILL /F /T /IM  "UnrealTraceServer.exe" >nul 2>&1

TASKKILL /F /T /IM  "AppleMobileDeviceProcess.exe" >nul 2>&1

TASKKILL /F /T /IM  "UplayWebCore.exe" >nul 2>&1
TASKKILL /F /T /IM  "upc.exe" >nul 2>&1

