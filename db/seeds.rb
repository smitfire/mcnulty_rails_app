require 'csv'

csv_text = File.read('./db/dftotal.csv')
csv = CSV.parse(csv_text, :headers => true)

5.times do
  Doctor.create!(name: Faker::Name.name, email: Faker::Internet.email, password: 'doctor', password_confirmation: 'doctor')
end

csv.each do |row|
  row = row.map{|val| val.strip }
  val_hash = row.to_hash
  val_hash["name"] = Faker::Name.name
  val_hash["email"] = Faker::Internet.email
  val_hash["password"] = 'patient'
  val_hash["password_confirmation"] = 'patient'
  val_hash["pic"] = "/rob.jpeg"
  num = rand(1..5)
  doc = Doctor.find(num)
  doc.patients.create!(val_hash)
end
