namespace :db do
  desc "make sample data by rake task"
  task make_data: :environment do
    Rake::Task["db:reset"].invoke

    puts "Create admin user"
    FactoryGirl.create :admin

    puts "Create region and everyting relative"
    Settings.locations.each do |location|
      FactoryGirl.create :region, province: location.last
    end
  end
end
