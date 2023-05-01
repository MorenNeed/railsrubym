task before_assets_precompile: :environment do
    system('yarn install --network-timeout 1000000000')
end

Rake::Task["assets:precompile"].enhance ["before_assets_precompile"]
