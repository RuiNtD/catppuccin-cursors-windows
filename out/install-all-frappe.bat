
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
InfDefaultInstall catppuccin-frappe-rosewater-cursors\install.inf
InfDefaultInstall catppuccin-frappe-flamingo-cursors\install.inf
InfDefaultInstall catppuccin-frappe-pink-cursors\install.inf
InfDefaultInstall catppuccin-frappe-mauve-cursors\install.inf
InfDefaultInstall catppuccin-frappe-red-cursors\install.inf
InfDefaultInstall catppuccin-frappe-maroon-cursors\install.inf
InfDefaultInstall catppuccin-frappe-peach-cursors\install.inf
InfDefaultInstall catppuccin-frappe-yellow-cursors\install.inf
InfDefaultInstall catppuccin-frappe-green-cursors\install.inf
InfDefaultInstall catppuccin-frappe-teal-cursors\install.inf
InfDefaultInstall catppuccin-frappe-sky-cursors\install.inf
InfDefaultInstall catppuccin-frappe-sapphire-cursors\install.inf
InfDefaultInstall catppuccin-frappe-blue-cursors\install.inf
InfDefaultInstall catppuccin-frappe-lavender-cursors\install.inf
InfDefaultInstall catppuccin-frappe-dark-cursors\install.inf
InfDefaultInstall catppuccin-frappe-light-cursors\install.inf