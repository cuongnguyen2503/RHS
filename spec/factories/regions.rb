FactoryGirl.define do
  factory :region do
    province ""
  
    after(:build) do |region|
      region.addresses << FactoryGirl.build(:address, region: region)
    end
  end
end
