task before_assets_precompile: :environment do
    system('yarn')
    system('npm install --force')
end

Rake::Task["assets:precompile"].enhance ["before_assets_precompile"]
