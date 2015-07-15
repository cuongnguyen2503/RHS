class Address < ActiveRecord::Base
  include RailsAdmin::Address

  paginates_per Settings.pages.ten

  belongs_to :user
  belongs_to :region
  has_many :rooms, dependent: :destroy
  has_many :images, dependent: :destroy
  has_many :reviews, dependent: :destroy

  accepts_nested_attributes_for :images, allow_destroy: true

  enum type: [:apartment, :villa]
end
