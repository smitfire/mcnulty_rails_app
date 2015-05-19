# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.paths << Rails.root.join("fonts/**", "font-awesome/**")
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( flatly.js flatly.css spacelab.css spacelab.js cosmo.js cosmo.css cyborg.css cyborg.js patients.css.less patients.js raphael.min.js morris.js morris-data.js morris.css sb-admin-rtl.css sb-admin.css d3.js flot-data.ja excanvas.min.js bootstrap-rtl.min.css jquery.flot.js jquery.flot.pie.js jquery.flot.resize.js jquery.flot.tooltip.min.js jquery.js bootstrap.js graph.js patients2.js )
