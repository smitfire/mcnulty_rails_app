class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :password_confirmation
      t.timestamps null: false
    end
  end
end
