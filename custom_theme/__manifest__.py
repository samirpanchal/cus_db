{
    "name": "Custom Green Theme",
    "version": "1.0",
    "depends": ["web"],
    "assets": {
        "web._assets_primary_variables": [
            ("prepend", "custom_theme/static/src/scss/primary_variables.scss"),
        ],
    },
    "installable": True,
    "application": False,
}
