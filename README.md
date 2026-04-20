# Catppuccin Cursors for Windows

This project is a fork of [Catppuccin Cursors], a modification of [Volantes Cursors].

You can find previews of the cursors on [Catppuccin Cursors]' page.

## Installation

- If upgrading, it's recommended to follow the [Uninstallation](#uninstallation) instructions first
- [Download and extract your desired theme](https://github.com/RuiNtD/catppuccin-cursors-windows/releases/latest)
- Right click `install.inf` and click "Install"
- Follow the [How to Apply Theme](#how-to-apply-theme) instructions

### Installing All Themes / of a Specific Flavor

- [Download and extract](https://github.com/RuiNtD/catppuccin-cursors-windows/releases/latest) one of the "all cursors" packages of your choice
- Open the corrisponding `install-all` script (likely near the bottom)

## How to Apply Theme

- Press Win + R and type `main.cpl` to open Mouse Properties
- Go to the Pointers tab
- From the Scheme section, select your desired theme
- Press OK

## Uninstallation

- Follow the [How to Apply Theme](#how-to-apply-theme) instructions to go back to "Windows Default"
- Press Win+R and go to `%SYSTEMROOT%\Cursors`
- Delete all **folders labelled "catppuccin"**
- Press Win+R and open `regedit`
- Paste `HKCU\Control Panel\Cursors\Schemes` into the top text box and press Enter
- Delete all **entries labelled "Catppuccin"**
- Do the same in `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Control Panel\Cursors\Schemes`

[Catppuccin Cursors]: https://github.com/catppuccin/cursors
[Volantes Cursors]: https://github.com/varlesh/volantes-cursors
