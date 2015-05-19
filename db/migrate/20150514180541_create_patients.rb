class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.integer :doctor_id
      t.integer :num
      t.integer :age
      t.integer :sex
      t.integer :cp
      t.integer :trestbps
      t.integer :htn
      t.integer :chol
      t.integer :cigs
      t.integer :fbs
      t.integer :dm
      t.integer :famhist
      t.integer :restecg
      t.integer :ekgyr
      t.integer :thaldur
      t.integer :thaltime
      t.integer :met
      t.integer :thalach
      t.integer :thalrest
      t.integer :tpeakbps
      t.integer :tpeakbpd
      t.integer :dummy
      t.integer :trestbpd
      t.integer :exang
      t.integer :xhypo
      t.integer :oldpeak
      t.integer :slope
      t.integer :rldv5e
      t.integer :ca
      t.integer :thal
      t.integer :cyr
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :password_confirmation
      t.string :pic
      t.timestamps null: false
    end
  end
end
# num,age,sex,cp,trestbps,htn,chol,cigs,fbs,dm,famhist,restecg,ekgyr,thaldur,thaltime,met,thalach,thalrest,tpeakbps,tpeakbpd,dummy,trestbpd,exang,xhypo,oldpeak,slope,rldv5e,ca,thal,cyr