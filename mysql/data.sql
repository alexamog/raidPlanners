create database raid;
flush privileges;
use raid;

create table hangouts (
    hID                 int not null auto_increment,
    hAuthor    varchar( 16) not null,
    hTitle     varchar( 32) not null,
    hDesc      varchar(128),
    hDate          datetime not null,
    hLocation  varchar(128),
    hAttendees        int[]        

    primary key (hangoutID)
);

create table users (
    userID           int not null,
    userName varchar(16) unique not null,

    primary key (userID)
);

insert into users (            userID,     userName)
values            (000000000000000000, 'user0#0000');

insert into hangouts (     hAuthor,          hTitle,                  hDate)
values               ('sbgum#7161', 'sample hangout', '2023-08-13 12:00:00');

create user 'raid-user'@'%'
identified by 'raiduser-0000';

grant all privileges on raid.*
to 'raid-user'@'%'
with grant option;

flush privileges;