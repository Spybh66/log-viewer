# Custom assets

Add custom robot models, fields and joysticks here; folders with the same name as a bundled asset replace it.

Format (same as AdvantageScope custom assets): one folder per asset, named with a type prefix:

- `Robot_<Name>/config.json` + `model.glb` (+ optional component models)
- `Field3d_<Name>/config.json` + `model.glb`
- `Field2d_<Name>/config.json` + `image.png`
- `Joystick_<Name>/config.json` + images

Docs: https://docs.advantagescope.org/more-features/custom-assets

The build merges these over the bundled assets and generates `viewer/assets/index.json`. Dotfiles and README files are ignored.
