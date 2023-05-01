# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create([{first_name: "Oleksii", last_name: "Roshchupkin", email: "mail@gmail.com", password: "fgh4576tjhghs", role: "ADMIN"}])
User.create([{first_name: "Test", last_name: "Subject", email: "testsubject@gmail.com", password: "fgh4576tjhghs", role: "ADMIN"}])
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

Item.create([{name: "Chair", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor maximus leo, in interdum leo aliquet vel. Curabitur non dolor id tortor commodo malesuada non eu augue. Nulla facilisi. Donec non nibh at tortor fermentum varius. Aliquam sit amet lacus lacinia, pretium felis nec, dapibus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nisi in sodales volutpat. Sed fringilla non dui vitae tincidunt.", price: 31.44}])
Item.create([{name: "Desk", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor maximus leo, in interdum leo aliquet vel. Curabitur non dolor id tortor commodo malesuada non eu augue. Nulla facilisi. Donec non nibh at tortor fermentum varius. Aliquam sit amet lacus lacinia, pretium felis nec, dapibus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nisi in sodales volutpat. Sed fringilla non dui vitae tincidunt.", price: 76.99}])
Item.create([{name: "Table", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor maximus leo, in interdum leo aliquet vel. Curabitur non dolor id tortor commodo malesuada non eu augue. Nulla facilisi. Donec non nibh at tortor fermentum varius. Aliquam sit amet lacus lacinia, pretium felis nec, dapibus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nisi in sodales volutpat. Sed fringilla non dui vitae tincidunt.", price: 102.50}])
Item.create([{name: "Sofa", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor maximus leo, in interdum leo aliquet vel. Curabitur non dolor id tortor commodo malesuada non eu augue. Nulla facilisi. Donec non nibh at tortor fermentum varius. Aliquam sit amet lacus lacinia, pretium felis nec, dapibus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nisi in sodales volutpat. Sed fringilla non dui vitae tincidunt.", price: 319.99}])
Item.create([{name: "Bookshelf", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor maximus leo, in interdum leo aliquet vel. Curabitur non dolor id tortor commodo malesuada non eu augue. Nulla facilisi. Donec non nibh at tortor fermentum varius. Aliquam sit amet lacus lacinia, pretium felis nec, dapibus enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas rhoncus nisi in sodales volutpat. Sed fringilla non dui vitae tincidunt.", price: 49.99}])
