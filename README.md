# Інтернет-магазин на Rails

Проект є інтернет-магазином, розробленим на фреймворку Ruby on Rails з використанням бази даних PostgreSQL.

## Таблиці бази даних

Проект містить такі таблиці у базі даних:

1. Users - таблиця з інформацією про зареєстрованих користувачів, що містить поля: first name, last name, email, password, role.
2. Items - таблиця з товарами, що містить поля: name, description, price.
3. Orders – таблиця з інформацією про замовлення користувачів, містить поля: user_id, amount.
4. Orders_description - таблиця, яка описує замовлення користувачів, містить поля: order_id, item_id, quantity.

## Функціональність проекту

Проект надає таку функціональність:

1. Реєстрація та авторизація користувачів за допомогою gem devise.
2. Пошук товарів та додавання їх у кошик із зазначенням кількості.
3. Оформлення замовлення зі створенням запису в таблиці Orders та розшифровкою цього запису в таблиці Orders_description.
4. Зв'язок таблиці Orders із таблицею Users через поле user_id.
5. Різний функціонал доступний залежно від ролі користувача (admin або user).
6. Можливість для зареєстрованих користувачів запросити список своїх замовлень та переглянути інформацію про кожне з них.

## Запуск проекту

Для запуску проекту необхідно настроїти оточення на базі Linux або запустити його під Windows Subsystem for Linux (WSL). Щоб запустити проект, виконайте такі кроки:

1. Встановіть Ruby та Ruby on Rails на свій комп'ютер.
2. Схиляйте репозиторій проекту.
3. Встановіть усі необхідні геми, виконавши команду bundle install.
4. Створіть базу даних за допомогою rails db:create.
5. Виконайте міграцію бази даних за допомогою команди rails db:migrate.
6. Запустіть проект за допомогою rails s.
Після виконання цих кроків проект буде доступний за адресою http://localhost:3000/.
