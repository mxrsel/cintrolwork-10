create schema news collate utf8mb4_general_ci;
use news;

create table news
(
    id         int auto_increment
        primary key,
    title      varchar(255)                       not null,
    content    text                               not null,
    image      varchar(255)                       null,
    created_at datetime default CURRENT_TIMESTAMP null
);


create table comments
(
    id      int auto_increment
        primary key,
    news_id int          not null,
    author  varchar(255) null,
    text    text         not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade
);

INSERT INTO news.news (title, content, image) VALUES ('hello', 'world', '2.jpg');

