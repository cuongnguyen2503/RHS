class CreateRegions < ActiveRecord::Migration
  def change
    create_table :regions do |t|
      t.string :town
      t.string :province

      t.timestamps null: false
    end
  end
end
