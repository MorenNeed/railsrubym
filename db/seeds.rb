# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create([{first_name: "Oleksii", last_name: "Roshchupkin", email: "mail@gmail.com", password: "1234", role: "ADMIN"}])
User.create([{first_name: "John", last_name: "Doe", email: "johndoe@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Jane", last_name: "Doe", email: "janedoe@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Bob", last_name: "Smith", email: "bobsmith@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Alice", last_name: "Jones", email: "alicejones@example.com", password: "password", role: "USER"}])
User.create([{first_name: "David", last_name: "Williams", email: "davidwilliams@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Sarah", last_name: "Wilson", email: "sarahwilson@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Michael", last_name: "Brown", email: "michaelbrown@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Emily", last_name: "Davis", email: "emilydavis@example.com", password: "password", role: "USER"}])
User.create([{first_name: "William", last_name: "Garcia", email: "williamgarcia@example.com", password: "password", role: "USER"}])
User.create([{first_name: "Sophia", last_name: "Hernandez", email: "sophiahernandez@example.com", password: "password", role: "USER"}])