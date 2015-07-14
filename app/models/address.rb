class Address < ActiveRecord::Base
  belongs_to :user
  has_many :rooms, dependent: :destroy
	has_many :images, dependent: :destroy

	accepts_nested_attributes_for :images

  enum type: [:apartment, :villa]
end
