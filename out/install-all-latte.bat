
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
InfDefaultInstall catppuccin-latte-rosewater-cursors\install.inf
InfDefaultInstall catppuccin-latte-flamingo-cursors\install.inf
InfDefaultInstall catppuccin-latte-pink-cursors\install.inf
InfDefaultInstall catppuccin-latte-mauve-cursors\install.inf
InfDefaultInstall catppuccin-latte-red-cursors\install.inf
InfDefaultInstall catppuccin-latte-maroon-cursors\install.inf
InfDefaultInstall catppuccin-latte-peach-cursors\install.inf
InfDefaultInstall catppuccin-latte-yellow-cursors\install.inf
InfDefaultInstall catppuccin-latte-green-cursors\install.inf
InfDefaultInstall catppuccin-latte-teal-cursors\install.inf
InfDefaultInstall catppuccin-latte-sky-cursors\install.inf
InfDefaultInstall catppuccin-latte-sapphire-cursors\install.inf
InfDefaultInstall catppuccin-latte-blue-cursors\install.inf
InfDefaultInstall catppuccin-latte-lavender-cursors\install.inf
InfDefaultInstall catppuccin-latte-dark-cursors\install.inf
InfDefaultInstall catppuccin-latte-light-cursors\install.inf