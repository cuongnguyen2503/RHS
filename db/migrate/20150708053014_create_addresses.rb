class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.float :lng
      t.float :lat
      t.integer :capacity
      t.string :contact
      t.string :description
      t.integer :type
      t.string :address
      t.float :rating

      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
