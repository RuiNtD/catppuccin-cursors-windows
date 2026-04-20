
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