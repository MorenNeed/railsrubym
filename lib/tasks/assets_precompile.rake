task before_assets_precompile: :environment do
    system('yarn')
end

Rake::Task["assets:precompile"].enhance ["before_assets_precompile"]
