class RemoveTownFromTable < ActiveRecord::Migration
  def change
    remove_column :regions, :town, :string
  end
end
