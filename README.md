## Task

https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view

## How to run the app

`npm install` - установить зависимости

`npm start` - запуск приложения

## Database snapshot

При первичной регистрации и авторизации в приложении в БД создается запись типа "LKJlas89LSdla9dasl". ID генерирует Firebase для каждого нового пользователя.

У каждого пользователя есть поле "tasks", которое в свою очередь состоит из объектов с именем, зависящим от даты создания задачи в приложении.

Благодаря этому, можно точечно добавлять/обновлять/удалять каждую задачу согласно документации Firebase, без необходимости перезаписывать все данные целиком.

![](https://imageup.ru/img118/4200462/asd.jpg)

Создание новой записи.

`set(ref(db, `users/${userId}/tasks/${activeDate}/${id}`), {
            id: 1,
            title: "Some title",
            description: "Some description",
            done: false,
            createdAt: new Date().getTime()
        });`
        
Обновление существующей записи.

` update(ref(db, `users/${userId}/tasks/${activeDate}/${id}`), {title: "New title", description: "New description"});`
            
Удаление записи.

`remove(ref(db, `users/${userId}/tasks/${activeDate}/${id}`))`


## Application stack

nanoid 4.0.1 - генератор ID

react-toastify 9.1.1 - всплывающие уведомления при ошибках авторизации/регистрации

react-router-dom 6.8.1 - маршрутизация приложения

react-redux 8.0.5 - state-менеджер

@reduxjs/toolkit 1.9.2 - библиотека для работы с Redux


## Files
- src/
  - app/ - хранилище для глобальных файлов приложения вроде store
  - components/ - компоненты приложения
      - Wrapper.js - "оболочка" всего приложения
  - assets/ - доп. файлы, необходимые для работы приложения
  - constans/ - константы для приложения
  - hooks/ - кастомные хуки для приложения
  - pages/ - страницы приложения для маршрутов
  
## Features

Реализация переключения тем оформления из кода реализована в файле App.js. Передача пропса theme со значениями "light" или "dark" переключит тему приложения.


