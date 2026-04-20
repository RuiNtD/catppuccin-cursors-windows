
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
InfDefaultInstall catppuccin-macchiato-rosewater-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-flamingo-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-pink-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-mauve-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-red-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-maroon-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-peach-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-yellow-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-green-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-teal-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-sky-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-sapphire-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-blue-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-lavender-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-dark-cursors\install.inf
InfDefaultInstall catppuccin-macchiato-light-cursors\install.inf