
@echo off
:: Check for administrative permissions
net session >nul 2>&1
if %errorLevel% == 0 (
  echo Installing Catppuccin cursors...
) else (
  echo Requesting administrative privileges...
  powershell start-process '%~f0' -verb runas
  exit /b
)

cd /d "%~dp0"
InfDefaultInstall catppuccin-mocha-rosewater-cursors\install.inf
InfDefaultInstall catppuccin-mocha-flamingo-cursors\install.inf
InfDefaultInstall catppuccin-mocha-pink-cursors\install.inf
InfDefaultInstall catppuccin-mocha-mauve-cursors\install.inf
InfDefaultInstall catppuccin-mocha-red-cursors\install.inf
InfDefaultInstall catppuccin-mocha-maroon-cursors\install.inf
InfDefaultInstall catppuccin-mocha-peach-cursors\install.inf
InfDefaultInstall catppuccin-mocha-yellow-cursors\install.inf
InfDefaultInstall catppuccin-mocha-green-cursors\install.inf
InfDefaultInstall catppuccin-mocha-teal-cursors\install.inf
InfDefaultInstall catppuccin-mocha-sky-cursors\install.inf
InfDefaultInstall catppuccin-mocha-sapphire-cursors\install.inf
InfDefaultInstall catppuccin-mocha-blue-cursors\install.inf
InfDefaultInstall catppuccin-mocha-lavender-cursors\install.inf
InfDefaultInstall catppuccin-mocha-dark-cursors\install.inf
InfDefaultInstall catppuccin-mocha-light-cursors\install.inf