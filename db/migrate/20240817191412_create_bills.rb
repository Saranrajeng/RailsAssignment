class CreateBills < ActiveRecord::Migration[7.2]
  def change
    create_table :bills do |t|
      t.decimal :amount
      t.integer :bill_type
      t.integer :status
      t.references :submitted_by, foreign_key: { to_table: :employees }

      t.timestamps
    end
  end
end
