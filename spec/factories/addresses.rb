FactoryGirl.define do
  factory :address do
    contact {Faker::Lorem.sentence(2)}
    address {Faker::Lorem.sentence(2)}
    description {Faker::Lorem.sentence(5)}
    lat {rand 18..23}
    lng {rand 104..107}
  end
end
